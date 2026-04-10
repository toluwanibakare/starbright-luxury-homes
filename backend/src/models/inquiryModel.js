const { query } = require("../config/database");

const createInquiry = async (payload) => {
  const sql = `
    INSERT INTO inquiries (name, email, phone, subject, message, source, property_id, is_read)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const result = await query(sql, [
    payload.name,
    payload.email,
    payload.phone,
    payload.subject,
    payload.message,
    payload.source,
    payload.property_id,
    payload.is_read || 0
  ]);

  return result.insertId;
};

const getAllInquiries = async () =>
  query("SELECT * FROM inquiries ORDER BY created_at DESC");

const getInquiryById = async (id) => {
  const rows = await query("SELECT * FROM inquiries WHERE id = ? LIMIT 1", [id]);
  return rows[0] || null;
};

const markInquiryRead = async (id, isRead) =>
  query("UPDATE inquiries SET is_read = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [
    isRead,
    id
  ]);

const deleteInquiry = async (id) =>
  query("DELETE FROM inquiries WHERE id = ?", [id]);

module.exports = {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  markInquiryRead,
  deleteInquiry
};
