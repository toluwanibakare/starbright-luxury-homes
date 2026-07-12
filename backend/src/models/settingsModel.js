const { query } = require("../config/database");

const getAllSettings = async () => {
  const rows = await query("SELECT * FROM settings");
  const settings = {};
  rows.forEach((row) => {
    settings[row.setting_key] = row.setting_value;
  });
  return settings;
};

const getSetting = async (key) => {
  const rows = await query("SELECT setting_value FROM settings WHERE setting_key = ? LIMIT 1", [key]);
  return rows[0] ? rows[0].setting_value : null;
};

const upsertSetting = async (key, value) => {
  await query(
    `INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), updated_at = CURRENT_TIMESTAMP`,
    [key, value]
  );
};

const upsertSettings = async (settingsObj) => {
  for (const [key, value] of Object.entries(settingsObj)) {
    await upsertSetting(key, value);
  }
};

module.exports = {
  getAllSettings,
  getSetting,
  upsertSetting,
  upsertSettings,
};
