const path = require("node:path");

module.exports = {
  development: {
    username: process.env.SQLITE_USER || "root",
    password: process.env.SQLITE_PASS || null,
    database: "database_development",
    host: process.env.SQLITE_HOST || "localhost",
    dialect: "sqlite",
    storage: path.join(
      __dirname,
      "./sequelize/database/youtube-database-dev.sqlite"
    ),
  },
  test: {
    username: process.env.SQLITE_USER || "root",
    password: process.env.SQLITE_PASS || null,
    database: "database_development",
    host: process.env.SQLITE_HOST || "localhost",
    dialect: "sqlite",
    storage: path.join(
      __dirname,
      "./sequelize/database/youtube-database-test.sqlite"
    ),
    logging: false,
  },
  production: {
    username: process.env.SQLITE_USER || "root",
    password: process.env.SQLITE_PASS || null,
    database: process.env.SQLITE_NAME || "database_production",
    host: process.env.SQLITE_HOST || "localhost",
    dialect: "sqlite",
    storage:
      process.env.SQLITE_STORAGE ||
      path.join(__dirname, "./sequelize/database/youtube-database-prod.sqlite"),
    logging: false,
  },
};
