const env = require("../config/env");
const { transporter, hasSmtpConfig } = require("../config/mailer");
const {
  buildInquiryAdminTemplate,
  buildAutoReplyTemplate
} = require("./mailTemplates");

const sendMailIfConfigured = async ({ to, subject, html }) => {
  if (!hasSmtpConfig) {
    return {
      sent: false,
      reason: "SMTP is not configured."
    };
  }

  await transporter.sendMail({
    from: env.smtp.from,
    to,
    subject,
    html
  });

  return {
    sent: true
  };
};

const sendInquiryNotification = async (payload) =>
  sendMailIfConfigured({
    to: env.smtp.adminEmail,
    subject: payload.subject || "New website inquiry",
    html: buildInquiryAdminTemplate(payload)
  });

const sendAutoReply = async ({ name, email }) =>
  sendMailIfConfigured({
    to: email,
    subject: "We received your message",
    html: buildAutoReplyTemplate({ name })
  });

module.exports = {
  sendInquiryNotification,
  sendAutoReply
};
