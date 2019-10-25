const Discord = require("discord.js");

module.exports.run = async(bot, message, args, database, perms) => {
    let amount = 0;
    if(!args[0]){
      amount = 100;
    }else{
      amount = parseInt(args[0]) + 1;
    }

    await message.channel.fetchMessages({ limit: amount }).then(messages => {
      message.channel.bulkDelete(messages)
    });
    return message.channel.send(`Cleared messages.`).then(msg => msg.delete(5000));
}

module.exports.help = {
  name: "clear",
  syntax: "clear <number of messages*>",
  description: "clear the channel messages",
}

module.exports.config = {
  name: "clear",
  permissions: ["MANAGE_MESSAGES"]
}
