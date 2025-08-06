const db = require("../../../sequelize/models");

const createNotificationConfig = async (notificationConfig) => {
  return await db.NotificationConfig.create({
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
  return await db.NotificationConfig.findAll();
};

const selectNotificationConfigsByGuildChannel = async (guildChannel) => {
  return await db.NotificationConfig.findAll({
    where: {
      guildChannelId: guildChannel,
    },
  });
};

const selectLastCheckedVideo = async (notificationConfig) => {
  const data = await db.NotificationConfig.findAll({
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
  await db.NotificationConfig.update(
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
  const data = await db.NotificationConfig.destroy({
    where: {
      guildChannelId: GuildChannelId,
      ytChannelId: YtChannelId,
    },
  });

  return !data ? false : true;
};

const removeAllConfigFromGuild = async (GuildId) => {
  const data = await db.NotificationConfig.destroy({
    where: {
      guildId: GuildId,
    },
  });

  return !data ? false : true;
};

const removeAllConfigFromGuildChannel = async (GuildChannelId) => {
  const data = await db.NotificationConfig.destroy({
    where: {
      guildChannelId: GuildChannelId,
    },
  });

  return !data ? false : true;
};

const alreadyExists = async (GuildChannelId, YtChannelId) => {
  const data = await db.NotificationConfig.findOne({
    where: {
      guildChannelId: GuildChannelId,
      ytChannelId: YtChannelId,
    },
  });

  return !data ? false : true;
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
