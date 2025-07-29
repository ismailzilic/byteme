const { NotificationConfig } = require("../models/NotificationConfig.js");

const createNotificationConfig = async (
  guildId,
  guildChannelId,
  ytChannelId,
  ytChannelTitle,
  lastCheckedTime,
  lastCheckedVideo
) => {
  return await NotificationConfig.create({
    guildId: guildId,
    guildChannelId: guildChannelId,
    ytChannelId: ytChannelId,
    ytChannelTitle: ytChannelTitle,
    lastCheckedTime: lastCheckedTime,
    lastCheckedVideo: lastCheckedVideo,
  });
};

const alreadyExists = async (guildChannelId, ytChannelId) => {
  const data = await NotificationConfig.findOne({
    where: {
      guildChannelId: guildChannelId,
      ytChannelId: ytChannelId,
    },
  });

  return !data ? false : true;
};

module.exports = { createNotificationConfig, alreadyExists };
