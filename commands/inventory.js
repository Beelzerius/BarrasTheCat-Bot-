const Discord = require("discord.js");
const Inv = require("../libs/inventory");

module.exports.run = async(bot, message, args, database, perms) => {
  let embed = new Discord.RichEmbed()
  .setTitle("Inventory")
  .setDescription(message.author.username)
  .setThumbnail(message.author.avatarURL)
  .setTimestamp();
  let list = "";
  Inv.inv(message.guild.id, message.author.id).forEach(function(i){
      let it = Inv.getItem(message.guild.id, parseInt(i.id));
      //list += `**Name:** ${it.name} - **Qtd:** ${i.qtd} - **Id:** ${i.id}\n`;
      embed.addField(it.name,`**Qtd:** ${i.qtd} - **Id:** ${i.id}`, true);
  });
  //embed.addField("Itens", list);
  return message.channel.send(embed);
}

module.exports.help = {
  name: "inventory",
  syntax: "inventory",
  description: "Show the inventory",
}

module.exports.config = {
  name: "inventory",
  permissions: []
}
