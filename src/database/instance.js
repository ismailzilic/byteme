const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  logging: false,
  storage: "./src/database.sqlite",
});

module.exports = sequelize;
