const { query } = require("../config/database");

const createComment = async (payload) => {
  const sql = `
    INSERT INTO comments (name, email, message, property_id, page_type, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const result = await query(sql, [
    payload.name,
    payload.email,
    payload.message,
    payload.property_id,
    payload.page_type,
    payload.status
  ]);

  return result.insertId;
};

const getAllComments = async () =>
  query("SELECT * FROM comments ORDER BY created_at DESC");

const getCommentById = async (id) => {
  const rows = await query("SELECT * FROM comments WHERE id = ? LIMIT 1", [id]);
  return rows[0] || null;
};

const updateCommentStatus = async (id, status) =>
  query("UPDATE comments SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [
    status,
    id
  ]);

const deleteComment = async (id) =>
  query("DELETE FROM comments WHERE id = ?", [id]);

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateCommentStatus,
  deleteComment
};
