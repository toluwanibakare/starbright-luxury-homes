const express = require("express");
const {
  startConversation,
  sendUserMessage,
  getConversationMessages
} = require("../controllers/chatController");

const router = express.Router();

router.post("/start", startConversation);
router.post("/:conversationId/message", sendUserMessage);
router.get("/:conversationId/messages", getConversationMessages);

module.exports = router;
