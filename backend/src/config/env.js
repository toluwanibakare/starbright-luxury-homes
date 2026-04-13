const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const env = {
  port: toNumber(process.env.PORT, 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  appUrl: process.env.APP_URL || "http://localhost:5000",
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  db: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: toNumber(process.env.DB_PORT, 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "starbright_real_estate"
  },
  smtp: {
    host: process.env.SMTP_HOST || "",
    port: toNumber(process.env.SMTP_PORT, 587),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.SMTP_FROM || "Starbright Real Estate <no-reply@example.com>",
    adminEmail: process.env.ADMIN_EMAIL || "admin@example.com"
  },
  uploads: {
    imageMaxBytes: toNumber(process.env.MAX_IMAGE_SIZE_MB, 8) * 1024 * 1024,
    videoMaxBytes: toNumber(process.env.MAX_VIDEO_SIZE_MB, 80) * 1024 * 1024
  }
};

module.exports = env;
