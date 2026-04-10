const app = require("./app");
const env = require("./config/env");
const { pool } = require("./config/database");

const start = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();

    app.listen(env.port, () => {
      console.log(`Server running on ${env.appUrl}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

start();
