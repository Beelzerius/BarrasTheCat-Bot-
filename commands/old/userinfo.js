const Discord = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./scr/warnings.json", "utf8"));
let coins = JSON.parse(fs.readFileSync("./scr/coins.json", "utf8"));

module.exports.run = async(bot, message, args, database) => {
  let iUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!iUser) iUser = message.author;
  let uIcon = message.guild.member(iUser).user.displayAvatarURL;
  let val = database.get(message.guild.id).find({ id: iUser.id}).value()
  let xp = val.xp;
  let level = val.level;
  //let nextLevel = Math.round((4 * Math.pow(level, 3)) / 5);
  let coins = val.coins;
  let warns = val.warns;

  let userEmbed = new Discord.RichEmbed()
  .setTitle(message.guild.member(iUser).user.username)
  .setDescription(`Level ${level}`)
  .setColor("#000000")
  .setThumbnail(uIcon)
  .addField("Coins",coins, true)
  .addField("Warnings",warns, true)
  .setFooter(`Joined On ${message.guild.member(iUser).joinedAt}`);

  return message.channel.send(userEmbed);
}

module.exports.help = {
  name: "userinfo"
}
