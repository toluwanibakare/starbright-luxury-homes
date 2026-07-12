const express = require("express");
const propertyRoutes = require("./propertyRoutes");
const mediaRoutes = require("./mediaRoutes");
const inquiryRoutes = require("./inquiryRoutes");
const commentRoutes = require("./commentRoutes");
const contactRoutes = require("./contactRoutes");
const chatRoutes = require("./chatRoutes");
const adminChatRoutes = require("./adminChatRoutes");
const healthRoutes = require("./healthRoutes");
const statsRoutes = require("./statsRoutes");
const settingsRoutes = require("./settingsRoutes");

const router = express.Router();

router.use("/properties", propertyRoutes);
router.use("/media", mediaRoutes);
router.use("/inquiries", inquiryRoutes);
router.use("/comments", commentRoutes);
router.use("/contact", contactRoutes);
router.use("/chats", chatRoutes);
router.use("/admin/chats", adminChatRoutes);
router.use("/health", healthRoutes);
router.use("/admin/stats", statsRoutes);
router.use("/settings", settingsRoutes);

module.exports = router;
