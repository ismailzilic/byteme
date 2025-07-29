module.exports = {
  name: "databaseConnection",
  async execute(sequelize) {
    try {
      await sequelize.authenticate();
      console.log("[DATABASE] Connection has been established.");
    } catch (error) {
      console.error(`[DATABASE] Unable to connect: ${error}`);
    }
  },
};
