const express = require("express");
const {
  createInquiryController,
  listInquiries,
  getInquiry,
  markInquiryReadController,
  replyToInquiryController,
  deleteInquiryController
} = require("../controllers/inquiryController");

const router = express.Router();

router.post("/", createInquiryController);
router.get("/", listInquiries);
router.get("/:id", getInquiry);
router.patch("/:id/read", markInquiryReadController);
router.post("/:id/reply", replyToInquiryController);
router.delete("/:id", deleteInquiryController);

module.exports = router;
