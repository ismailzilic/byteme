const { Sequelize } = require("sequelize");

const { sequelize } = require("../instance.js");

module.exports = (client) => {
  const YouTubeVideos = sequelize.define("YouTubeVideos", {
    ChannelId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    VideoId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    VideoLink: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    PubDate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    NotificationSent: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });
  client.databaseModels.push(YouTubeVideos);
};
