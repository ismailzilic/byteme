const NotificationConfig = require("../models/NotificationConfig.js");

const createNotificationConfig = async (
  GuildId,
  GuildChannelId,
  YtChannelId,
  YtChannelTitle,
  LastCheckedTime,
  LastCheckedVideo
) => {
  return await NotificationConfig.create({
    guildId: GuildId,
    guildChannelId: GuildChannelId,
    ytChannelId: YtChannelId,
    ytChannelTitle: YtChannelTitle,
    lastCheckedTime: LastCheckedTime,
    lastCheckedVideo: LastCheckedVideo,
  });
};

const selectAllNotificationConfigs = async () => {
  return await NotificationConfig.findAll();
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
  removeNotificationConfig,
  removeAllConfigFromGuild,
  removeAllConfigFromGuildChannel,
  alreadyExists,
};
