const express = require("express");
const { deleteMediaController } = require("../controllers/propertyController");

const router = express.Router();

router.delete("/:id", deleteMediaController);

module.exports = router;
