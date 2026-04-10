const { query } = require("../config/database");

const createConversation = async ({ name, email, status, last_message_at, started_at }) => {
  const result = await query(
    `
      INSERT INTO conversations (name, email, status, last_message_at, started_at)
      VALUES (?, ?, ?, ?, ?)
    `,
    [name, email, status, last_message_at, started_at]
  );

  return result.insertId;
};

const getConversationById = async (id) => {
  const rows = await query("SELECT * FROM conversations WHERE id = ? LIMIT 1", [id]);
  return rows[0] || null;
};

const getLatestConversationByEmail = async (email) => {
  const rows = await query(
    "SELECT * FROM conversations WHERE email = ? ORDER BY last_message_at DESC, id DESC LIMIT 1",
    [email]
  );
  return rows[0] || null;
};

const getAllConversations = async () =>
  query("SELECT * FROM conversations ORDER BY last_message_at DESC, created_at DESC");

const updateConversationStatus = async (id, status, closedAt = null) =>
  query(
    `
      UPDATE conversations
      SET status = ?, closed_at = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
    [status, closedAt, id]
  );

const touchConversation = async (id, timestamp) =>
  query(
    "UPDATE conversations SET last_message_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [timestamp, id]
  );

const createMessage = async ({ conversation_id, sender_type, message, is_read }) => {
  const result = await query(
    `
      INSERT INTO messages (conversation_id, sender_type, message, is_read)
      VALUES (?, ?, ?, ?)
    `,
    [conversation_id, sender_type, message, is_read]
  );

  return result.insertId;
};

const getMessagesByConversationId = async (conversationId) =>
  query(
    "SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC, id ASC",
    [conversationId]
  );

const markMessagesAsRead = async (conversationId, senderType = null) => {
  if (senderType) {
    return query(
      `
        UPDATE messages
        SET is_read = 1
        WHERE conversation_id = ? AND sender_type = ? AND is_read = 0
      `,
      [conversationId, senderType]
    );
  }

  return query(
    "UPDATE messages SET is_read = 1 WHERE conversation_id = ? AND is_read = 0",
    [conversationId]
  );
};

module.exports = {
  createConversation,
  getConversationById,
  getLatestConversationByEmail,
  getAllConversations,
  updateConversationStatus,
  touchConversation,
  createMessage,
  getMessagesByConversationId,
  markMessagesAsRead
};
