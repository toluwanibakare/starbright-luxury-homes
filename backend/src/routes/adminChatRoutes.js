const express = require("express");
const {
  listAdminConversations,
  getAdminConversation,
  replyToConversation,
  closeConversation,
  markConversationRead
} = require("../controllers/chatController");

const router = express.Router();

router.get("/", listAdminConversations);
router.get("/:conversationId", getAdminConversation);
router.post("/:conversationId/reply", replyToConversation);
router.patch("/:conversationId/close", closeConversation);
router.patch("/:conversationId/read", markConversationRead);

module.exports = router;
