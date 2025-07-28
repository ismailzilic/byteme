const { YouTubeChannels } = require("../models/YouTubeChannels.js");

module.exports = {
  createYouTubeChannels: async (channelId, title, link, feedUrl) => {
    try {
      await YouTubeChannels.create({
        ChannelId: channelId,
        ChannelName: title,
        ChannelLink: link,
        FeedUrl: feedUrl,
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError")
        throw Error("Same instance exists in a database.");
      throw Error("Unable to create an instance.");
    }
  },
};
