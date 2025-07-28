const { YouTubeVideos } = require("../models/YouTubeVideos.js");

module.exports = {
  createYouTubeVideos: async (channelId, videos) => {
    try {
      for (const video of videos) {
        await YouTubeVideos.create({
          ChannelId: channelId,
          VideoId: video.id,
          VideoLink: video.link,
          Title: video.title,
          PubDate: video.pubDate,
          NotificationSent: false,
        });
      }
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError")
        throw Error("Same instance exists in a database.");
      throw Error("Unable to create an instance.");
    }
  },
};
