const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("MIAU! (No!)");

  if(!args[0]){
    message.channel.fetchMessages()
      .then(messages => {
        message.channel.bulkDelete(messages);
        messagesDeleted = messages.array().length;
        message.channel.send(`Cleared ${messagesDeleted} messages.`).then(msg => msg.delete(5000));
    })
    .catch(err => {
        console.log(err);
    });
    return;
  }
  message.channel.bulkDelete(args[0]+).then(() =>{
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
  });
}

module.exports.help = {
  name: "clear"
}
