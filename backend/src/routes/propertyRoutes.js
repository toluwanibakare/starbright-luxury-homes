const express = require("express");
const {
  listProperties,
  getProperty,
  getPropertyBySlugController,
  createPropertyController,
  updatePropertyController,
  deletePropertyController,
  uploadPropertyImages,
  uploadPropertyVideo
} = require("../controllers/propertyController");
const { imageUpload, videoUpload } = require("../middleware/upload");

const router = express.Router();

router.get("/", listProperties);
router.get("/slug/:slug", getPropertyBySlugController);
router.get("/:id", getProperty);
router.post("/", createPropertyController);
router.put("/:id", updatePropertyController);
router.delete("/:id", deletePropertyController);
router.post("/:id/images", imageUpload.array("images", 20), uploadPropertyImages);
router.post("/:id/video", videoUpload.single("video"), uploadPropertyVideo);

module.exports = router;
