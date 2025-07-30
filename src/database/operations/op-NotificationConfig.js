const NotificationConfig = require("../models/NotificationConfig.js");

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

const findAllNotificationConfigs = async () => {
  return await NotificationConfig.findAll();
};

const alreadyExists = async (guildChannelId, ytChannelId) => {
  const data = await NotificationConfig.findOne({
    where: {
      guildChannelId: guildChannelId,
      ytChannelId: ytChannelId,
    },
  });

  console.log(data);

  if (data == null) return false;
  return true;
};

module.exports = {
  createNotificationConfig,
  findAllNotificationConfigs,
  alreadyExists,
};
