const Discord = require("discord.js");

module.exports.run = async(bot, message, args, database, perms) => {
  if(!args[0]) return message.reply("Wrong or missing arguments");
  let question = args.join(" ");
  let replies = database.get(message.guild.id).find({ id: "configs"}).value()["8b"];

  let result = Math.floor((Math.random() * replies.length));

  let ballembed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#FF9900")
  .addField(question, replies[result]);

  message.channel.send(ballembed);
}

module.exports.help = {
  name: "8ball",
  syntax: "8ball <question>",
  description: "Answer a question",
}

module.exports.config = {
  name: "8ball",
  permissions: []
}
