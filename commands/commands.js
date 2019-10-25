const Discord = require("discord.js");

module.exports.run = async(bot, message, args, database, perms) => {
  let embed = new Discord.RichEmbed()
  .setTitle("Commands")
  .setDescription(message.author.username);
  let list = "";
  bot.commands.forEach(function(cmd){
    if(message.member.hasPermission(cmd.config.permissions)){
      list += `** ${bot.prefix}${cmd.help.name}**: ${cmd.help.description}\n`;
    }
  });
  embed.addField("List", list);
  return message.channel.send(embed);
}

module.exports.help = {
  name: "commands",
  syntax: "commands",
  description: "Show the bot commands",
}

module.exports.config = {
  name: "commands",
  permissions: []
}
