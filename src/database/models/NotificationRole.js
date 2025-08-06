const { Sequelize } = require("sequelize");
const sequelize = require("../instance.js");

const NotificationRole = sequelize.define("NotificationRole", {
  guildId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  roleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = NotificationRole;
