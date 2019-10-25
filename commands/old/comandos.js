const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let helpEmbed = new Discord.RichEmbed()
  .setDescription("Comandos")
  .setColor("#110114")
  .addField("*ajuda", "Abre o menu de ajuda.")
  .addField("*comandos", "Lista os principais comandos.")
  .addField("*botinfo", "Mostra minhas informações.")
  .addField("*serverinfo", "Mostra informações do servidor.")
  .addField("*tempmute @user 1s/m/h/d", "Muta user por algum tempo.")

  return message.channel.send(helpEmbed);
}

module.exports.help = {
  name: "comandos"
}
