const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

  let result = Math.floor(Math.random() * (+20 - +1)) + +1;

  let dice = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#FFFFFF")
  .addField("Result", result);

  message.channel.send(dice);
}

module.exports.help = {
  name: "d20" 
}
