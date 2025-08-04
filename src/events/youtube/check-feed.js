const {
  selectAllNotificationConfigs,
  selectLastCheckedVideo,
  removeAllConfigFromGuild,
  removeAllConfigFromGuildChannel,
  updateLastCheckedVideo,
} = require("../../database/operations/op-NotificationConfig.js");
const Parser = require("rss-parser");
const { EmbedBuilder } = require("discord.js");

const parser = new Parser();

const checkFeed = async (client) => {
  const data = await selectAllNotificationConfigs();
  console.log("Checking YouTube feed...");

  for (const notificationConfig of data) {
    const YT_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${notificationConfig.ytChannelId}`;
    const feed = await parser
      .parseURL(YT_URL)
      .catch((error) => console.error(`Error while fetching feed: ${error}`));

    if (!feed?.items.length) continue;

    const latestVideo = feed.items[0];
    const lastCheckedVideo = await selectLastCheckedVideo(notificationConfig);
    console.log(latestVideo, "-", lastCheckedVideo);

    if (
      lastCheckedVideo == null ||
      (latestVideo.id !== lastCheckedVideo.id &&
        new Date(latestVideo.pubDate) > new Date(lastCheckedVideo.pubDate))
    ) {
      console.log("Condition fulfilled...");
      try {
        let targetGuild =
          client.guilds.cache.get(notificationConfig.guildId) ||
          (await fetchGuild(client, notificationConfig.guildId));
      } catch (error) {
        if (error.code == 10004)
          // 10004 = guild non existent
          await removeAllConfigFromGuild(notificationConfig.guildId);
        continue;
      }
      if (targetGuild instanceof Array && targetGuild.length > 0)
        targetGuild = targetGuild[0];
      else
        console.error(
          `Error in ${__filename} while fetching guild channel list from DiscordAPI.`
        );

      // Remove the '<#>' part of the id
      let guildChannelId = notificationConfig.guildChannelId;
      if (guildChannelId.startsWith("<#")) {
        guildChannelId = notificationConfig.guildChannelId.replace(
          /<#(\d+)>/,
          "$1"
        );
      }

      try {
        const targetChannel =
          targetGuild.channels.cache.get(guildChannelId) ||
          (await targetGuild.channels.fetch(guildChannelId));
      } catch (error) {
        if (error.code == 10003)
          // 10003 = channel non existent
          await removeAllConfigFromGuildChannel(
            notificationConfig.guildChannelId
          );
        continue;
      }

      await updateLastCheckedVideo(notificationConfig, latestVideo).then(() => {
        const embed = new EmbedBuilder()
          .setColor(client.config.colors.youtube)
          .setAuthor({ name: "YouTube", url: "https://www.youtube.com" })
          .setTitle(latestVideo.title)
          .setURL(latestVideo.link)
          .setImage(
            `https://img.youtube.com/vi/${
              latestVideo.id.slice(":")[2]
            }/maxresdefault.jpg`
          )
          .setDescription(feed.title)
          .setURL(feed.link)
          .setTimestamp();

        targetChannel.send({ embeds: [embed] });
      });
    }
  }
};

// Most normal JS function
const fetchGuild = async (client, guildId) => {
  const initialResult = await client.guilds.fetch(guildId);
  let results = initialResult.map((guild) => guild.fetch());

  return Promise.all(results);
};

module.exports = { checkFeed };
