module.exports = {
  
  name: "interactionCreate",
  execute(interaction) {
    try {
      console.log(
        `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
      );
    } catch (e) {
      console.log(e);
    }
  },
};
