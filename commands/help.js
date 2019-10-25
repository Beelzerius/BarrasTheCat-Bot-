const Discord = require("discord.js");

module.exports.run = async(bot, message, args, database, perms) => {
  if(args[0]){
    let command = args[0];
    if(bot.commands.has(command)){
      command = bot.commands.get(command)
      let embed = new Discord.RichEmbed()
      .setTitle("Help Command")
      .setDescription(args[0])
      .setColor("#c3eff5")
      .addField("Syntax", `${bot.prefix}${command.help.syntax}`)
      .addField("Description", command.help.description);
      return message.channel.send(embed);
    }
  }else{
    let embed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#000000")
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Command List", "*commands");
    return message.channel.send(embed);
  }
}

module.exports.help = {
  name: "help",
  syntax: "help <command*>",
  description: "Show command info or bot info",
}

module.exports.config = {
  name: "help",
  permissions: []
}
