"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("NotificationConfigs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      guildId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      guildChannelId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      ytChannelId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ytChannelTitle: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastCheckedTime: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      lastCheckedVideoId: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      lastCheckedVideoPubDate: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("NotificationConfigs");
  },
};
