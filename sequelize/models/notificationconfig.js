"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NotificationConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  NotificationConfig.init(
    {
      guildId: DataTypes.INTEGER,
      guildChannelId: DataTypes.INTEGER,
      ytChannelId: DataTypes.STRING,
      ytChannelTitle: DataTypes.STRING,
      lastCheckedTime: DataTypes.DATE,
      lastCheckedVideoId: DataTypes.STRING,
      lastCheckedVideoPubDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "NotificationConfig",
    }
  );
  return NotificationConfig;
};
