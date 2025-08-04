const NotificationConfig = require("../models/NotificationConfig.js");

const createNotificationConfig = async (notificationConfig) => {
  return await NotificationConfig.create({
    guildId: notificationConfig.guildId,
    guildChannelId: notificationConfig.guildChannelId,
    ytChannelId: notificationConfig.ytChannelId,
    ytChannelTitle: notificationConfig.ytChannelTitle,
    lastCheckedTime: new Date(),
    lastCheckedVideoId: null,
    lastCheckedVideoPubDate: null,
  });
};

const selectAllNotificationConfigs = async () => {
  return await NotificationConfig.findAll();
};

const selectNotificationConfigsByGuildChannel = async (guildChannel) => {
  return await NotificationConfig.findAll({
    where: {
      guildChannelId: guildChannel,
    },
  });
};

const selectLastCheckedVideo = async (notificationConfig) => {
  const data = await NotificationConfig.findAll({
    attributes: ["lastCheckedVideoId", "lastCheckedVideoPubDate"],
    where: {
      guildChannelId: notificationConfig.guildChannelId,
      ytChannelId: notificationConfig.ytChannelId,
    },
  });

  if (!data) return null;

  const id = data[0].getDataValue("lastCheckedVideoId");
  const pubDate = data[0].getDataValue("lastCheckedVideoPubDate");

  if (!id || !pubDate) return null;

  return { id, pubDate };
};

const updateLastCheckedVideo = async (notificationConfig, latestVideo) => {
  await NotificationConfig.update(
    {
      lastCheckedVideoId: latestVideo.id,
      lastCheckedVideoPubDate: new Date(latestVideo.pubDate),
    },
    {
      where: {
        ytChannelId: notificationConfig.ytChannelId,
        guildChannelId: notificationConfig.guildChannelId,
      },
    }
  );
};

const removeNotificationConfig = async (GuildChannelId, YtChannelId) => {
  const data = NotificationConfig.destroy({
    where: {
      guildChannelId: GuildChannelId,
      ytChannelId: YtChannelId,
    },
  });

  if (data == null) return false;
  return true;
};

const removeAllConfigFromGuild = async (GuildId) => {
  const data = NotificationConfig.destroy({
    where: {
      guildId: GuildId,
    },
  });

  if (data == null) return false;
  return true;
};

const removeAllConfigFromGuildChannel = async (GuildChannelId) => {
  const data = NotificationConfig.destroy({
    where: {
      guildChannelId: GuildChannelId,
    },
  });

  if (data == null) return false;
  return true;
};

const alreadyExists = async (GuildChannelId, YtChannelId) => {
  const data = await NotificationConfig.findOne({
    where: {
      guildChannelId: GuildChannelId,
      ytChannelId: YtChannelId,
    },
  });

  if (data == null) return false;
  return true;
};

module.exports = {
  createNotificationConfig,
  selectAllNotificationConfigs,
  selectNotificationConfigsByGuildChannel,
  selectLastCheckedVideo,
  updateLastCheckedVideo,
  removeNotificationConfig,
  removeAllConfigFromGuild,
  removeAllConfigFromGuildChannel,
  alreadyExists,
};
