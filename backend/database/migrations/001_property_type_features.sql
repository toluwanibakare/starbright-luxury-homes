-- ============================================================
-- Migration: 001_property_type_features
-- Adds type-specific columns to the properties table
-- so House, Land, and Commercial listings can store
-- their own feature fields.
-- Compatible with MySQL 5.7+ (no IF NOT EXISTS on columns).
-- ============================================================

-- 1. Add columns for property type–specific features
-- Each ALTER TABLE statement uses a procedure-like check so
-- it won't error if the column already exists.

DROP PROCEDURE IF EXISTS add_column_if_missing;
DELIMITER //
CREATE PROCEDURE add_column_if_missing()
BEGIN
  DECLARE _count INT;

  SET _count = (SELECT COUNT(*) FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'properties' AND COLUMN_NAME = 'furnished');
  IF _count = 0 THEN
    ALTER TABLE properties ADD COLUMN furnished ENUM('furnished','unfurnished','semi-furnished') DEFAULT NULL COMMENT 'House-specific';
  END IF;

  SET _count = (SELECT COUNT(*) FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'properties' AND COLUMN_NAME = 'land_use');
  IF _count = 0 THEN
    ALTER TABLE properties ADD COLUMN land_use VARCHAR(255) DEFAULT NULL COMMENT 'Land-specific (residential, commercial, agricultural, mixed)';
  END IF;

  SET _count = (SELECT COUNT(*) FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'properties' AND COLUMN_NAME = 'floor_level');
  IF _count = 0 THEN
    ALTER TABLE properties ADD COLUMN floor_level INT DEFAULT NULL COMMENT 'Commercial / House-specific';
  END IF;

  SET _count = (SELECT COUNT(*) FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'properties' AND COLUMN_NAME = 'parking_spaces');
  IF _count = 0 THEN
    ALTER TABLE properties ADD COLUMN parking_spaces INT DEFAULT NULL COMMENT 'Commercial / House-specific';
  END IF;

  SET _count = (SELECT COUNT(*) FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'properties' AND COLUMN_NAME = 'year_built');
  IF _count = 0 THEN
    ALTER TABLE properties ADD COLUMN year_built INT DEFAULT NULL COMMENT 'House-specific';
  END IF;
END //
DELIMITER ;

CALL add_column_if_missing();
DROP PROCEDURE IF EXISTS add_column_if_missing;

-- 2. Ensure default settings rows exist (won't overwrite existing)
INSERT IGNORE INTO settings (setting_key, setting_value) VALUES
  ('admin_name', 'Starbright Admin'),
  ('admin_email', 'admin@starbrightproperties.com'),
  ('whatsapp_number', '+234 703 376 4029'),
  ('support_email', 'hello@starbrightproperties.com');
