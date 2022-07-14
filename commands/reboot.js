const { SlashCommandBuilder } = require("@discordjs/builders");
const { spawn } = require("child_process");

module.exports = {
    ownerOnly: true,
  data: new SlashCommandBuilder()
    .setName("reboot")
    .setDescription("Reboots the pi."),
  async execute(interaction) {
    try {
      await interaction.reply("Rebooting...");
      spawn("sudo", ["reboot"]);
    } catch (e) {
      console.log(e);
      await interaction.reply(
        "There was an error while rebooting. (maybe the host is on windows)"
      );
    }
  },
};
