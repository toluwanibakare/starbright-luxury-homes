const { query } = require("../config/database");

const propertySelect = `
  SELECT
    p.*,
    COALESCE(
      JSON_ARRAYAGG(
        CASE
          WHEN pm.id IS NOT NULL THEN JSON_OBJECT(
            'id', pm.id,
            'file_type', pm.file_type,
            'file_path', pm.file_path,
            'file_name', pm.file_name,
            'mime_type', pm.mime_type,
            'created_at', pm.created_at
          )
        END
      ),
      JSON_ARRAY()
    ) AS media
  FROM properties p
  LEFT JOIN property_media pm ON pm.property_id = p.id
`;

const normalizeProperty = (row) => ({
  ...row,
  media: Array.isArray(row.media)
    ? row.media.filter(Boolean)
    : JSON.parse(row.media || "[]").filter(Boolean)
});

const createProperty = async (payload) => {
  const sql = `
    INSERT INTO properties (
      title, slug, description, price, location, address, category, property_type,
      status, is_featured, verification_status, bedrooms, bathrooms, toilets,
      size_value, size_unit, listing_code, documents_info, inspection_info
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const result = await query(sql, [
    payload.title,
    payload.slug,
    payload.description,
    payload.price,
    payload.location,
    payload.address,
    payload.category,
    payload.property_type,
    payload.status,
    payload.is_featured,
    payload.verification_status,
    payload.bedrooms,
    payload.bathrooms,
    payload.toilets,
    payload.size_value,
    payload.size_unit,
    payload.listing_code,
    payload.documents_info,
    payload.inspection_info
  ]);

  return result.insertId;
};

const updateProperty = async (id, payload) => {
  const sql = `
    UPDATE properties SET
      title = ?, slug = ?, description = ?, price = ?, location = ?, address = ?,
      category = ?, property_type = ?, status = ?, is_featured = ?,
      verification_status = ?, bedrooms = ?, bathrooms = ?, toilets = ?,
      size_value = ?, size_unit = ?, listing_code = ?, documents_info = ?,
      inspection_info = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  return query(sql, [
    payload.title,
    payload.slug,
    payload.description,
    payload.price,
    payload.location,
    payload.address,
    payload.category,
    payload.property_type,
    payload.status,
    payload.is_featured,
    payload.verification_status,
    payload.bedrooms,
    payload.bathrooms,
    payload.toilets,
    payload.size_value,
    payload.size_unit,
    payload.listing_code,
    payload.documents_info,
    payload.inspection_info,
    id
  ]);
};

const deleteProperty = async (id) => query("DELETE FROM properties WHERE id = ?", [id]);

const getAllProperties = async () => {
  const rows = await query(`${propertySelect} GROUP BY p.id ORDER BY p.created_at DESC`);
  return rows.map(normalizeProperty);
};

const getPropertyById = async (id) => {
  const rows = await query(`${propertySelect} WHERE p.id = ? GROUP BY p.id LIMIT 1`, [id]);
  return rows[0] ? normalizeProperty(rows[0]) : null;
};

const getPropertyBySlug = async (slug) => {
  const rows = await query(`${propertySelect} WHERE p.slug = ? GROUP BY p.id LIMIT 1`, [slug]);
  return rows[0] ? normalizeProperty(rows[0]) : null;
};

module.exports = {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getPropertyById,
  getPropertyBySlug
};
