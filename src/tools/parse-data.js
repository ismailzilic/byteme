const Parser = require("rss-parser");

module.exports = {
  parseData: async (channelId) => {
    const parser = new Parser();
    let parsingErrorFlag = false;

    const rawData = await parser
      .parseURL(`https://youtube.com/feeds/videos.xml?channel_id=${channelId}`)
      .catch((error) => {
        console.error(error);
        parsingErrorFlag = true;
      });

    if (parsingErrorFlag)
      return interaction.reply({
        content: "Unable to find a YouTube channel with specified ID.",
      });

    const parsedData = JSON.parse(rawData);
    return parsedData;
  },
};
