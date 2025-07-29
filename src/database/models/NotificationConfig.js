const { Sequelize } = require("sequelize");

const sequelize = require("../instance.js");

const NotificationConfig = sequelize.define("notificationConfig", {
  guildId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  guildChannelId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ytChannelId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  ytChannelTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastCheckedTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  lastCheckedVideo: {
    type: {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pubDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      allowNull: true,
    },
  },
});

module.exports = NotificationConfig;
