const NotificationRole = require("../models/NotificationRole.js");

const createNotificationRole = async (notificationRole) => {
  return await NotificationRole.create({
    guildId: notificationRole.guildId,
    roleId: notificationRole.roleId,
  });
};

const selectNotificationRole = async (notificationRole) => {
  const data = await NotificationRole.findOne({
    where: {
      guildId: notificationRole.guildId,
      roleId: notificationRole.roleId,
    },
  });

  return !data ? false : true;
};

const selectNotificationRoleByGuild = async (guildId) => {
  const data = await NotificationRole.findOne({
    where: {
      guildId: guildId,
    },
  });

  const roleId = data.getDataValue("roleId");

  if (!roleId) return null;
  return { roleId };
};

const updateNotificationRole = async (notificationRole) => {
  await NotificationRole.update(
    {
      guildId: notificationRole.guildId,
      roleId: notificationRole.roleId,
    },
    {
      where: {
        guildId: notificationRole.guildId,
        roleId: notificationRole.guildId,
      },
    }
  );
};

const deleteNotificationRole = async (guildId) => {
  const data = await NotificationRole.destroy({
    where: {
      guildId: guildId,
    },
  });

  return !data ? false : true;
};

module.exports = {
  createNotificationRole,
  selectNotificationRole,
  selectNotificationRoleByGuild,
  updateNotificationRole,
  deleteNotificationRole,
};
