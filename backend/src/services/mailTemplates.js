const buildInquiryAdminTemplate = ({
  name,
  email,
  phone,
  subject,
  message,
  source,
  propertyId
}) => `
  <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
    <h2 style="margin-bottom: 16px;">New Website Inquiry</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
    <p><strong>Subject:</strong> ${subject || "No subject"}</p>
    <p><strong>Source:</strong> ${source}</p>
    <p><strong>Property ID:</strong> ${propertyId || "Not linked"}</p>
    <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px;">
      <strong>Message</strong>
      <p style="margin-top: 8px;">${message}</p>
    </div>
  </div>
`;

const buildAutoReplyTemplate = ({ name }) => `
  <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
    <h2 style="margin-bottom: 16px;">Hello ${name},</h2>
    <p>Thank you for contacting Starbright Real Estate.</p>
    <p>We have received your message and a member of our team will get back to you shortly.</p>
    <p>Best regards,<br />Starbright Real Estate</p>
  </div>
`;

const buildInquiryReplyTemplate = ({ name, replyMessage }) => `
  <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
    <h2 style="margin-bottom: 16px;">Hello ${name},</h2>
    <p>Our team has replied to your enquiry.</p>
    <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px;">
      <strong>Reply</strong>
      <p style="margin-top: 8px;">${replyMessage}</p>
    </div>
    <p style="margin-top: 16px;">You can reply directly to this email if you need more help.</p>
    <p>Best regards,<br />Starbright Real Estate</p>
  </div>
`;

module.exports = {
  buildInquiryAdminTemplate,
  buildAutoReplyTemplate,
  buildInquiryReplyTemplate
};
