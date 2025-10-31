const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { MessageFlags } = require("discord.js");

const command = new SlashCommandBuilder()
  .setName("user-info")
  .setDescription("Responds with informations about you.");

const execute = async (interaction) => {
  const embed = new EmbedBuilder()
    .setColor(interaction.client.config.colors.primary)
    .setTitle("User Info")
    .setThumbnail(interaction.user.displayAvatarURL())
    .addFields(
      {
        name: "**User ID**",
        value: `${interaction.user.id}`,
      },
      {
        name: `**Username**`,
        value: `${interaction.user.username}`,
      }
    )
    .setTimestamp()
    .setFooter({ text: "This message is only visible to you." });

  await interaction.reply({
    embeds: [embed],
    flags: MessageFlags.Ephemeral,
  });
};

module.exports = { data: command, execute };
