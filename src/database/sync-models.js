module.exports = {
  syncModels: async (client) => {
    for (const model of client.databaseModels) {
      model.sync();
    }
    console.log(`${client.databaseModels.length} database model(s) synced.`);
  },
};
