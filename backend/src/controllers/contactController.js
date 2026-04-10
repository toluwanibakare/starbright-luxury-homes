const asyncHandler = require("../utils/asyncHandler");
const { createInquiryController } = require("./inquiryController");

const contactController = asyncHandler(async (req, res, next) => {
  req.body.source = req.body.source || "contact_page";
  return createInquiryController(req, res, next);
});

module.exports = {
  contactController
};
