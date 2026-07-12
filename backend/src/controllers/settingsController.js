const settingsModel = require("../models/settingsModel");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const { requireFields } = require("../utils/validation");

const getSettings = asyncHandler(async (req, res) => {
  const settings = await settingsModel.getAllSettings();
  sendSuccess(res, 200, "Settings retrieved successfully", settings);
});

const updateSettings = asyncHandler(async (req, res) => {
  const allowedKeys = ["admin_name", "admin_email", "whatsapp_number", "support_email"];
  const updates = {};

  for (const key of allowedKeys) {
    if (req.body[key] !== undefined) {
      updates[key] = String(req.body[key]);
    }
  }

  if (Object.keys(updates).length === 0) {
    const { error } = require("../utils/ApiError");
    throw new (require("../utils/ApiError"))(400, "No valid settings provided to update.");
  }

  await settingsModel.upsertSettings(updates);
  const settings = await settingsModel.getAllSettings();

  sendSuccess(res, 200, "Settings updated successfully", settings);
});

module.exports = {
  getSettings,
  updateSettings,
};
