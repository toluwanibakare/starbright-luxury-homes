-- Run this on the live database to add the settings table
CREATE TABLE IF NOT EXISTS settings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO settings (setting_key, setting_value) VALUES
  ('admin_name', 'Starbright Admin'),
  ('admin_email', 'admin@starbrightproperties.com'),
  ('whatsapp_number', '+234 703 376 4029'),
  ('support_email', 'hello@starbrightproperties.com');
