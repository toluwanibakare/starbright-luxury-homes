const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { sendSuccess } = require("../utils/apiResponse");
const { isEmail, requireFields, assert } = require("../utils/validation");
const {
  createConversation,
  getConversationById,
  getLatestConversationByEmail,
  getAllConversations,
  updateConversationStatus,
  touchConversation,
  createMessage,
  getMessagesByConversationId,
  markMessagesAsRead
} = require("../models/chatModel");

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const isWithin24Hours = (timestamp) => {
  if (!timestamp) {
    return false;
  }

  return Date.now() - new Date(timestamp).getTime() <= DAY_IN_MS;
};

const getConversationState = async (conversation) => {
  if (!conversation) {
    return null;
  }

  if (conversation.status === "active" && !isWithin24Hours(conversation.last_message_at)) {
    await updateConversationStatus(conversation.id, "expired", null);
    return {
      ...conversation,
      status: "expired"
    };
  }

  if (conversation.status === "closed" && conversation.closed_at) {
    return {
      ...conversation,
      status: "closed"
    };
  }

  return conversation;
};

const ensureConversationCanReceiveMessage = async (conversation) => {
  const normalized = await getConversationState(conversation);
  if (!normalized) {
    throw new ApiError(404, "Conversation not found.");
  }

  if (normalized.status !== "active") {
    throw new ApiError(409, "This conversation is no longer active.", {
      conversationStatus: normalized.status,
      action: "start_new_conversation"
    });
  }

  return normalized;
};

const startConversation = asyncHandler(async (req, res) => {
  requireFields(req.body, ["name", "email", "message"]);
  assert(isEmail(req.body.email), 400, "A valid email is required.");

  const email = req.body.email.trim().toLowerCase();
  const latest = await getLatestConversationByEmail(email);
  const latestState = await getConversationState(latest);

  if (latestState && latestState.status === "active" && isWithin24Hours(latestState.last_message_at)) {
    const messageId = await createMessage({
      conversation_id: latestState.id,
      sender_type: "user",
      message: req.body.message.trim(),
      is_read: 0
    });

    const now = new Date();
    await touchConversation(latestState.id, now);
    const conversation = await getConversationById(latestState.id);
    const messages = await getMessagesByConversationId(latestState.id);

    return sendSuccess(res, 200, "Existing active conversation continued.", {
      conversation,
      message: messages.find((item) => item.id === messageId) || null,
      messages
    }, {
      reusedConversation: true
    });
  }

  const now = new Date();
  const conversationId = await createConversation({
    name: req.body.name.trim(),
    email,
    status: "active",
    last_message_at: now,
    started_at: now
  });

  await createMessage({
    conversation_id: conversationId,
    sender_type: "user",
    message: req.body.message.trim(),
    is_read: 0
  });

  const conversation = await getConversationById(conversationId);
  const messages = await getMessagesByConversationId(conversationId);

  return sendSuccess(res, 201, "New conversation started successfully.", {
    conversation,
    messages
  }, {
    reusedConversation: false
  });
});

const sendUserMessage = asyncHandler(async (req, res) => {
  requireFields(req.body, ["email", "message"]);
  assert(isEmail(req.body.email), 400, "A valid email is required.");

  const conversation = await getConversationById(req.params.conversationId);
  assert(conversation, 404, "Conversation not found.");
  assert(
    conversation.email.toLowerCase() === req.body.email.trim().toLowerCase(),
    403,
    "Conversation email validation failed."
  );

  const activeConversation = await ensureConversationCanReceiveMessage(conversation);

  const messageId = await createMessage({
    conversation_id: activeConversation.id,
    sender_type: "user",
    message: req.body.message.trim(),
    is_read: 0
  });

  await touchConversation(activeConversation.id, new Date());
  const messages = await getMessagesByConversationId(activeConversation.id);

  return sendSuccess(res, 201, "Message sent successfully.", {
    conversationId: activeConversation.id,
    message: messages.find((item) => item.id === messageId) || null,
    status: "active"
  });
});

const getConversationMessages = asyncHandler(async (req, res) => {
  const { email } = req.query;
  assert(isEmail(email), 400, "A valid email query parameter is required.");

  const conversation = await getConversationById(req.params.conversationId);
  assert(conversation, 404, "Conversation not found.");
  assert(
    conversation.email.toLowerCase() === String(email).trim().toLowerCase(),
    403,
    "Conversation email validation failed."
  );

  const normalized = await getConversationState(conversation);
  const messages = await getMessagesByConversationId(req.params.conversationId);

  return sendSuccess(res, 200, "Conversation messages fetched successfully.", {
    conversation: normalized,
    messages
  });
});

const listAdminConversations = asyncHandler(async (req, res) => {
  const conversations = await getAllConversations();
  const normalized = [];

  for (const conversation of conversations) {
    normalized.push(await getConversationState(conversation));
  }

  return sendSuccess(res, 200, "Conversations fetched successfully.", normalized);
});

const getAdminConversation = asyncHandler(async (req, res) => {
  const conversation = await getConversationById(req.params.conversationId);
  assert(conversation, 404, "Conversation not found.");

  const normalized = await getConversationState(conversation);
  const messages = await getMessagesByConversationId(req.params.conversationId);

  return sendSuccess(res, 200, "Conversation fetched successfully.", {
    conversation: normalized,
    messages
  });
});

const replyToConversation = asyncHandler(async (req, res) => {
  requireFields(req.body, ["message"]);

  const conversation = await getConversationById(req.params.conversationId);
  const activeConversation = await ensureConversationCanReceiveMessage(conversation);

  const messageId = await createMessage({
    conversation_id: activeConversation.id,
    sender_type: "admin",
    message: req.body.message.trim(),
    is_read: 0
  });

  await touchConversation(activeConversation.id, new Date());
  await markMessagesAsRead(activeConversation.id, "user");
  const messages = await getMessagesByConversationId(activeConversation.id);

  return sendSuccess(res, 201, "Reply sent successfully.", {
    conversationId: activeConversation.id,
    message: messages.find((item) => item.id === messageId) || null
  });
});

const closeConversation = asyncHandler(async (req, res) => {
  const conversation = await getConversationById(req.params.conversationId);
  assert(conversation, 404, "Conversation not found.");

  await updateConversationStatus(req.params.conversationId, "closed", new Date());
  const updated = await getConversationById(req.params.conversationId);

  return sendSuccess(res, 200, "Conversation closed successfully.", updated, {
    action: "start_new_conversation_for_future_messages"
  });
});

const markConversationRead = asyncHandler(async (req, res) => {
  const conversation = await getConversationById(req.params.conversationId);
  assert(conversation, 404, "Conversation not found.");

  await markMessagesAsRead(req.params.conversationId);
  const messages = await getMessagesByConversationId(req.params.conversationId);

  return sendSuccess(res, 200, "Messages marked as read.", messages);
});

module.exports = {
  startConversation,
  sendUserMessage,
  getConversationMessages,
  listAdminConversations,
  getAdminConversation,
  replyToConversation,
  closeConversation,
  markConversationRead
};
