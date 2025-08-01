const { checkFeed } = require("../youtube/check-feed.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Ready!!! ${client.user.tag} is online!`);

    checkFeed(client);

    setInterval(() => {
      checkFeed(client);
    }, 60000);
  },
};
