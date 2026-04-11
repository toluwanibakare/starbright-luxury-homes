const env = require("../config/env");
const { transporter, hasSmtpConfig } = require("../config/mailer");
const {
  buildInquiryAdminTemplate,
  buildAutoReplyTemplate,
  buildInquiryReplyTemplate
} = require("./mailTemplates");

const sendMailIfConfigured = async ({ to, subject, html, replyTo }) => {
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
    html,
    replyTo
  });

  return {
    sent: true
  };
};

const sendInquiryNotification = async (payload) =>
  sendMailIfConfigured({
    to: env.smtp.adminEmail,
    subject: payload.subject || "New website inquiry",
    html: buildInquiryAdminTemplate(payload),
    replyTo: payload.email
  });

const sendAutoReply = async ({ name, email }) =>
  sendMailIfConfigured({
    to: email,
    subject: "We received your message",
    html: buildAutoReplyTemplate({ name })
  });

const sendInquiryReply = async ({ name, email, replyMessage }) =>
  sendMailIfConfigured({
    to: email,
    subject: "Reply to your Starbright enquiry",
    html: buildInquiryReplyTemplate({ name, replyMessage })
  });

module.exports = {
  sendInquiryNotification,
  sendAutoReply,
  sendInquiryReply
};
