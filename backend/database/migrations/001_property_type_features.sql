ALTER TABLE properties ADD COLUMN furnished ENUM('furnished','unfurnished','semi-furnished') DEFAULT NULL COMMENT 'House-specific';
ALTER TABLE properties ADD COLUMN land_use VARCHAR(255) DEFAULT NULL COMMENT 'Land-specific (residential, commercial, agricultural, mixed)';
ALTER TABLE properties ADD COLUMN floor_level INT DEFAULT NULL COMMENT 'Commercial / House-specific';
ALTER TABLE properties ADD COLUMN parking_spaces INT DEFAULT NULL COMMENT 'Commercial / House-specific';
ALTER TABLE properties ADD COLUMN year_built INT DEFAULT NULL COMMENT 'House-specific';
