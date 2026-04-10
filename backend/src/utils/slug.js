const { query } = require("../config/database");

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const generateUniquePropertySlug = async (title, excludeId = null) => {
  const baseSlug = slugify(title) || "property";
  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const sql = excludeId
      ? "SELECT id FROM properties WHERE slug = ? AND id != ? LIMIT 1"
      : "SELECT id FROM properties WHERE slug = ? LIMIT 1";
    const params = excludeId ? [slug, excludeId] : [slug];
    const rows = await query(sql, params);

    if (rows.length === 0) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
};

module.exports = {
  slugify,
  generateUniquePropertySlug
};
