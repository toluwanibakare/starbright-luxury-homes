-- Run each ALTER separately in phpMyAdmin.
-- If a column already exists, just skip that line.

ALTER TABLE properties ADD COLUMN furnished ENUM('furnished','unfurnished','semi-furnished') DEFAULT NULL COMMENT 'House-specific';
ALTER TABLE properties ADD COLUMN land_use VARCHAR(255) DEFAULT NULL COMMENT 'Land-specific (residential, commercial, agricultural, mixed)';
ALTER TABLE properties ADD COLUMN floor_level INT DEFAULT NULL COMMENT 'Commercial / House-specific';
ALTER TABLE properties ADD COLUMN parking_spaces INT DEFAULT NULL COMMENT 'Commercial / House-specific';
ALTER TABLE properties ADD COLUMN year_built INT DEFAULT NULL COMMENT 'House-specific';

-- Ensure default settings exist (won't overwrite existing values)
INSERT IGNORE INTO settings (setting_key, setting_value) VALUES
  ('admin_name', 'Starbright Admin'),
  ('admin_email', 'admin@starbrightproperties.com'),
  ('whatsapp_number', '+234 703 376 4029'),
  ('support_email', 'hello@starbrightproperties.com');
