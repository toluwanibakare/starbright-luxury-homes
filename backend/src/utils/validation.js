const ApiError = require("./ApiError");

const allowedPropertyStatuses = ["available", "sold", "featured", "hidden", "draft"];
const allowedCategories = ["land", "house", "commercial"];
const allowedCommentStatuses = ["pending", "approved", "rejected"];
const allowedConversationStatuses = ["active", "closed", "expired", "dormant"];

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const isEmail = (value) =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const toNullableNumber = (value) => {
  if (value === undefined || value === null || value === "") {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
};

const toBoolean = (value) =>
  value === true || value === "true" || value === 1 || value === "1";

const assert = (condition, statusCode, message, details = null) => {
  if (!condition) {
    throw new ApiError(statusCode, message, details);
  }
};

const requireFields = (payload, fields) => {
  const missing = fields.filter((field) => !isNonEmptyString(payload[field]));
  if (missing.length > 0) {
    throw new ApiError(400, "Validation failed", {
      missingFields: missing
    });
  }
};

module.exports = {
  allowedPropertyStatuses,
  allowedCategories,
  allowedCommentStatuses,
  allowedConversationStatuses,
  isNonEmptyString,
  isEmail,
  toNullableNumber,
  toBoolean,
  assert,
  requireFields
};
