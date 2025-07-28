const { syncModels } = require("../../database/sync-models.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    syncModels(client);
    console.log(`Ready!!! ${client.user.tag} is online!`);
  },
};
