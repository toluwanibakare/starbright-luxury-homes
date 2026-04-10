const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const env = require("../config/env");

const healthController = asyncHandler(async (req, res) => {
  return sendSuccess(res, 200, "API is healthy.", {
    status: "ok",
    environment: env.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

module.exports = {
  healthController
};
