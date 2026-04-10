const express = require("express");
const {
  createCommentController,
  listComments,
  approveCommentController,
  rejectCommentController,
  deleteCommentController
} = require("../controllers/commentController");

const router = express.Router();

router.post("/", createCommentController);
router.get("/", listComments);
router.patch("/:id/approve", approveCommentController);
router.patch("/:id/reject", rejectCommentController);
router.delete("/:id", deleteCommentController);

module.exports = router;
