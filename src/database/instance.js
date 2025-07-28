const { Sequelize } = require("sequelize");

module.exports = {
  sequelize: new Sequelize({
    dialect: "sqlite",
    logging: false,
    storage: "./youtube.db",
  }),
};
