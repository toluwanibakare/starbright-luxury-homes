const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { sendSuccess } = require("../utils/apiResponse");
const {
  allowedCommentStatuses,
  isEmail,
  requireFields
} = require("../utils/validation");
const {
  createComment,
  getAllComments,
  getCommentById,
  updateCommentStatus,
  deleteComment
} = require("../models/commentModel");

const createCommentController = asyncHandler(async (req, res) => {
  requireFields(req.body, ["name", "email", "message", "page_type"]);
  if (!isEmail(req.body.email)) {
    throw new ApiError(400, "A valid email is required.");
  }

  const commentId = await createComment({
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    message: req.body.message.trim(),
    property_id: req.body.property_id || null,
    page_type: req.body.page_type.trim(),
    status: "pending"
  });

  const comment = await getCommentById(commentId);
  return sendSuccess(res, 201, "Comment submitted successfully.", comment);
});

const listComments = asyncHandler(async (req, res) => {
  const comments = await getAllComments();
  return sendSuccess(res, 200, "Comments fetched successfully.", comments);
});

const updateCommentStatusController = (status) =>
  asyncHandler(async (req, res) => {
    if (!allowedCommentStatuses.includes(status)) {
      throw new ApiError(400, "Invalid comment status.");
    }

    const comment = await getCommentById(req.params.id);
    if (!comment) {
      throw new ApiError(404, "Comment not found.");
    }

    await updateCommentStatus(req.params.id, status);
    const updated = await getCommentById(req.params.id);
    return sendSuccess(res, 200, `Comment ${status} successfully.`, updated);
  });

const deleteCommentController = asyncHandler(async (req, res) => {
  const comment = await getCommentById(req.params.id);
  if (!comment) {
    throw new ApiError(404, "Comment not found.");
  }

  await deleteComment(req.params.id);
  return sendSuccess(res, 200, "Comment deleted successfully.");
});

module.exports = {
  createCommentController,
  listComments,
  approveCommentController: updateCommentStatusController("approved"),
  rejectCommentController: updateCommentStatusController("rejected"),
  deleteCommentController
};
