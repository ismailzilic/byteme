const { Sequelize } = require("sequelize");

const { sequelize } = require("../instance.js");

module.exports = (client) => {
  const YouTubeChannels = sequelize.define("YouTubeChannels", {
    ChannelId: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    ChannelName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ChannelLink: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    FeedUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  client.databaseModels.push(YouTubeChannels);
};
