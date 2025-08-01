const {
  selectAllNotificationConfigs,
  removeAllConfigFromGuild,
  removeAllConfigFromGuildChannel,
} = require("../../database/operations/op-NotificationConfig.js");
const Parser = require("rss-parser");
const { EmbedBuilder } = require("discord.js");

const parser = new Parser();

const checkFeed = async (client) => {
  const data = await selectAllNotificationConfigs();

  for (const notificationConfig of data) {
    const YT_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${notificationConfig.ytChannelId}`;

    const feed = await parser
      .parseURL(YT_URL)
      .catch((error) => console.error(`Error while fetching feed: ${error}`));

    if (!feed?.items.length) continue;

    const latestVideo = feed.items[0];
    const lastCheckedVideo = notificationConfig.lastCheckedVideo;

    if (
      lastCheckedVideo == null ||
      (latestVideo.id !== lastCheckedVideo.id &&
        new Date(latestVideo.pubDate) > new Date(lastCheckedVideo.pubDate))
    ) {
      let targetGuild =
        client.guilds.cache.get(notificationConfig.guildId) ||
        (await fetchGuild(client, notificationConfig.guildId));

      if (targetGuild instanceof Array && targetGuild.length > 0) {
        targetGuild = targetGuild[0];
      }

      if (!targetGuild) {
        await removeAllConfigFromGuild(notificationConfig.guildId);
        continue;
      }

      let guildChannelId = notificationConfig.guildChannelId;

      if (guildChannelId.startsWith("<#")) {
        guildChannelId = notificationConfig.guildChannelId.replace(
          /<#(\d+)>/,
          "$1"
        );
      }

      const targetChannel =
        targetGuild.channels.cache.get(guildChannelId) ||
        (await targetGuild.channels.fetch(guildChannelId));

      if (!targetChannel) {
        await removeAllConfigFromGuildChannel(
          notificationConfig.guildChannelId
        );
        continue;
      }

      notificationConfig.lastCheckedVideo.push({
        id: latestVideo.id,
        pubDate: latestVideo.pubDate,
      });
      notificationConfig.changed("lastCheckedVideo", true);

      await notificationConfig
        .save()
        .then(() => {
          const message = new EmbedBuilder()
            .setColor(client.config.colors.primary)
            .setAuthor("YouTube")
            .setURL("https://www.youtube.com")
            .setTitle(feed.title)
            .setURL(feed.link)
            .setDescription(latestVideo.title)
            .setURL(latestVideo.link)
            .setTimestamp();

          targetChannel.send(message);
        })
        .catch((error) => null);
    }
  }
};

const fetchGuild = async (client, guildId) => {
  const initialResult = await client.guilds.fetch(guildId);
  let results = initialResult.map((guild) => guild.fetch());

  return Promise.all(results);
};

module.exports = { checkFeed };
