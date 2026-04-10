const { query } = require("../config/database");

const createMediaRecord = async (payload) => {
  const sql = `
    INSERT INTO property_media (property_id, file_type, file_path, file_name, mime_type)
    VALUES (?, ?, ?, ?, ?)
  `;

  const result = await query(sql, [
    payload.property_id,
    payload.file_type,
    payload.file_path,
    payload.file_name,
    payload.mime_type
  ]);

  return result.insertId;
};

const getMediaById = async (id) => {
  const rows = await query("SELECT * FROM property_media WHERE id = ? LIMIT 1", [id]);
  return rows[0] || null;
};

const getMediaByPropertyId = async (propertyId) => {
  return query(
    "SELECT * FROM property_media WHERE property_id = ? ORDER BY created_at ASC",
    [propertyId]
  );
};

const deleteMediaById = async (id) =>
  query("DELETE FROM property_media WHERE id = ?", [id]);

module.exports = {
  createMediaRecord,
  getMediaById,
  getMediaByPropertyId,
  deleteMediaById
};
