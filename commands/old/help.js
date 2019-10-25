const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  if(args[0]){
    let command = args[0];
    if(bot.commands.has(command)){
      command = bot.commands.get(command)
      return message.reply(command.help.description);
    }
  }
}

module.exports.help = {
  name: "help",
  description: "help <command>"
}
