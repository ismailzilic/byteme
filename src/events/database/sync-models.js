module.exports = {
  name: "syncModels",
  async execute(sequelize) {
    try {
      await sequelize.sync({ alter: true });
      console.log(
        `[DATABASE] ${
          Object.keys(sequelize.models).length
        } model(s) have been successfully synced.`
      );
    } catch (error) {
      console.error(`[DATABASE] Error while synchronizing models: ${error}`);
    }
  },
};
