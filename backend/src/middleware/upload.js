const fs = require("fs");
const path = require("path");
const multer = require("multer");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

const uploadsRoot = path.join(process.cwd(), "uploads");
const imageDir = path.join(uploadsRoot, "images");
const videoDir = path.join(uploadsRoot, "videos");

[uploadsRoot, imageDir, videoDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const imageMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
const videoMimeTypes = ["video/mp4", "video/quicktime", "video/webm"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, file.fieldname === "video" ? videoDir : imageDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const safeBase = path
      .basename(file.originalname, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    cb(null, `${Date.now()}-${safeBase || "file"}${extension}`);
  }
});

const imageUpload = multer({
  storage,
  limits: { fileSize: env.uploads.imageMaxBytes },
  fileFilter: (req, file, cb) => {
    if (!imageMimeTypes.includes(file.mimetype)) {
      cb(new ApiError(400, "Only JPG, PNG, and WEBP image files are allowed."));
      return;
    }
    cb(null, true);
  }
});

const videoUpload = multer({
  storage,
  limits: { fileSize: env.uploads.videoMaxBytes },
  fileFilter: (req, file, cb) => {
    if (!videoMimeTypes.includes(file.mimetype)) {
      cb(new ApiError(400, "Only MP4, MOV, and WEBM video files are allowed."));
      return;
    }
    cb(null, true);
  }
});

module.exports = {
  imageUpload,
  videoUpload
};
