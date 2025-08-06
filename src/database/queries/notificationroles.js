const db = require("../../../sequelize/models");

const createNotificationRole = async (notificationRole) => {
  return await db.NotificationRoles.create({
    guildId: notificationRole.guildId,
    roleId: notificationRole.roleId,
  });
};

const selectNotificationRole = async (notificationRole) => {
  const data = await db.NotificationRoles.findOne({
    where: {
      guildId: notificationRole.guildId,
      roleId: notificationRole.roleId,
    },
  });

  return !data ? false : true;
};

const selectNotificationRoleByGuild = async (guildId) => {
  const data = await db.NotificationRoles.findOne({
    where: {
      guildId: guildId,
    },
  });

  const roleId = data.getDataValue("roleId");

  if (!roleId) return null;
  return { roleId };
};

const updateNotificationRole = async (notificationRole) => {
  await db.NotificationRoles.update(
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
  const data = await db.NotificationRoles.destroy({
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
