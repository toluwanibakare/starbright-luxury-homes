const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { sendSuccess } = require("../utils/apiResponse");
const { isEmail, requireFields } = require("../utils/validation");
const {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  markInquiryRead,
  deleteInquiry
} = require("../models/inquiryModel");
const { sendInquiryNotification, sendAutoReply } = require("../services/mailService");

const createInquiryController = asyncHandler(async (req, res) => {
  requireFields(req.body, ["name", "email", "message", "source"]);
  if (!isEmail(req.body.email)) {
    throw new ApiError(400, "A valid email is required.");
  }

  const inquiryId = await createInquiry({
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    phone: req.body.phone ? req.body.phone.trim() : null,
    subject: req.body.subject ? req.body.subject.trim() : null,
    message: req.body.message.trim(),
    source: req.body.source.trim(),
    property_id: req.body.property_id || null,
    is_read: 0
  });

  const inquiry = await getInquiryById(inquiryId);
  const mailResult = await sendInquiryNotification({
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    subject: inquiry.subject,
    message: inquiry.message,
    source: inquiry.source,
    propertyId: inquiry.property_id
  });

  await sendAutoReply({
    name: inquiry.name,
    email: inquiry.email
  });

  return sendSuccess(res, 201, "Inquiry submitted successfully.", inquiry, {
    emailNotification: mailResult
  });
});

const listInquiries = asyncHandler(async (req, res) => {
  const inquiries = await getAllInquiries();
  return sendSuccess(res, 200, "Inquiries fetched successfully.", inquiries);
});

const getInquiry = asyncHandler(async (req, res) => {
  const inquiry = await getInquiryById(req.params.id);
  if (!inquiry) {
    throw new ApiError(404, "Inquiry not found.");
  }

  return sendSuccess(res, 200, "Inquiry fetched successfully.", inquiry);
});

const markInquiryReadController = asyncHandler(async (req, res) => {
  const inquiry = await getInquiryById(req.params.id);
  if (!inquiry) {
    throw new ApiError(404, "Inquiry not found.");
  }

  const nextValue =
    req.body && Object.prototype.hasOwnProperty.call(req.body, "is_read")
      ? Number(Boolean(req.body.is_read))
      : 1;

  await markInquiryRead(req.params.id, nextValue);
  const updated = await getInquiryById(req.params.id);
  return sendSuccess(
    res,
    200,
    nextValue ? "Inquiry marked as read." : "Inquiry marked as unread.",
    updated
  );
});

const deleteInquiryController = asyncHandler(async (req, res) => {
  const inquiry = await getInquiryById(req.params.id);
  if (!inquiry) {
    throw new ApiError(404, "Inquiry not found.");
  }

  await deleteInquiry(req.params.id);
  return sendSuccess(res, 200, "Inquiry deleted successfully.");
});

module.exports = {
  createInquiryController,
  listInquiries,
  getInquiry,
  markInquiryReadController,
  deleteInquiryController
};
