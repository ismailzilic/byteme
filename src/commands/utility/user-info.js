const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user-info")
    .setDescription("Responds with informations about you."),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor(client.color)
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
  },
};
