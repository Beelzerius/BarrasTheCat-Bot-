const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");

module.exports.run = async(bot, message, args, database, perms) => {
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!user) return message.reply("User not found");
  let love = Math.floor(Math.random() * (100 - 0)) + 0;
  let embed = new Discord.RichEmbed()
    .setTitle("Love")
    .setDescription(`Has ${love}% of love between <@${user.id}> and <@${message.guild.member(message.author).user.id}>`)
    .setThumbnail("https://www.dictionary.com/e/wp-content/uploads/2018/09/revolving-hearts-emoji.png")
    .setColor("#c916ad");
    return message.channel.send(embed);
}

module.exports.help = {
  name: "love",
  syntax: "love <@user>",
  description: "Return the % of love between the users.",
}

module.exports.config = {
  name: "love",
  permissions: []
}
