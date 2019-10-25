const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let helpEmbed = new Discord.RichEmbed()
  .setDescription("Ajuda")
  .setColor("#110114")
  .addField("*ajuda", "Abre o menu de ajuda.")

  return message.channel.send(helpEmbed);
}

module.exports.help = {
  name: "ajuda"
}
