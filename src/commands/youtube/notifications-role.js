const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  InteractionContextType,
  EmbedBuilder,
} = require("discord.js");
const {
  createNotificationRole,
  selectNotificationRole,
  updateNotificationRole,
  deleteNotificationRole,
} = require("../../database/queries/notificationroles.js");

const command = new SlashCommandBuilder()
  .setName("notifications-role")
  .setDescription(
    "Sets a role to ping when there's a new notification. This will overwrite an existing set up role."
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
  .setContexts(InteractionContextType.Guild)
  .addRoleOption((option) =>
    option
      .setName("role")
      .setDescription(
        "Desired role you wish to get notified. Leave this field empty to remove a role."
      )
      .setRequired(false)
  );

const execute = async (interaction) => {
  await interaction.deferReply();

  const guildId = interaction.guild.id;

  let roleId;
  try {
    roleId = interaction.options.getRole("role").id;
  } catch (error) {
    if (await deleteNotificationRole(guildId)) {
      const embed = new EmbedBuilder()
        .setColor(interaction.client.config.colors.primary)
        .setTitle("Notification role removed successfully.")
        .setDescription(
          `You removed a notification role for your server. If you want to set it up again use this command with a role specified.`
        )
        .setTimestamp();

      return await interaction.followUp({ embeds: [embed] });
    }
  }

  if (await selectNotificationRole({ guildId, roleId })) {
    await updateNotificationRole({ guildId, roleId });

    const embed = new EmbedBuilder()
      .setColor(interaction.client.config.colors.primary)
      .setTitle("Notification role set up successfully.")
      .setDescription(
        `<@&${roleId}> set up as a new notification role.\n(Overwritten the last set up role.)`
      )
      .setTimestamp();

    return await interaction.followUp({ embeds: [embed] });
  }

  if (await createNotificationRole({ guildId, roleId })) {
    const embed = new EmbedBuilder()
      .setColor(interaction.client.config.colors.primary)
      .setTitle("Notification role set up successfully.")
      .setDescription(`<@&${roleId}> set up as a new notification role.`)
      .setTimestamp();

    return await interaction.followUp({ embeds: [embed] });
  }

  const embed = new EmbedBuilder()
    .setColor(interaction.client.config.colors.primary)
    .setTitle("Notification role set up failed.")
    .setDescription(`Something went wrong while configuring the role.`)
    .setTimestamp();

  await interaction.followUp({ embeds: [embed] });
};

module.exports = { data: command, execute };
