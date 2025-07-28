const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random-number")
    .setDescription("Gives you a random number. Range is optional.")
    .addIntegerOption((minNumber) =>
      minNumber
        .setName("min")
        .setDescription("Sets the minimum value. Default is 0")
    )
    .addIntegerOption((maxNumber) =>
      maxNumber
        .setName("max")
        .setDescription("Sets the maximum value. Default is 100")
    ),
  async execute(interaction, client) {
    await interaction.reply({
      content: `Calculating...`,
    });
    await wait(500);

    let min = interaction.options.getInteger("min") ?? 0;
    let max = interaction.options.getInteger("max") ?? 100;

    let invalidFlag = false;

    if (
      min >= max ||
      min < Number.MIN_SAFE_INTEGER ||
      max > Number.MAX_SAFE_INTEGER
    ) {
      invalidFlag = true;
      min = 0;
      max = 100;
    }

    const number = Math.floor(Math.random() * (max - min + 1)) + min;

    if (invalidFlag)
      await interaction.editReply({
        content: `*Invalid inputs, calculated defaults.*\nGenerated number: **${number}**`,
      });
    else
      await interaction.editReply({
        content: `Generated number: **${number}**`,
      });
  },
};
