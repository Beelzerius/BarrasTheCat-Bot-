const Discord = require("discord.js");

module.exports.run = async(bot, message, args, database, perms) => {
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!user) user = message.author;
  let val = database.get(message.guild.id).find({ id: user.id}).value();

  let embed = new Discord.RichEmbed()
  .setTitle(`${message.guild.member(user).user.username}`)
  .setDescription(`Level ${val.level}`)
  .setColor("#000000")
  .setThumbnail(message.guild.member(user).user.avatarURL)
  .addField("Coins",`${val.coins}$`, true)
  .addField("Warnings",val.warns, true)
  .setFooter(`Joined On ${message.guild.member(user).joinedAt}`);

  return message.channel.send(embed);
}

module.exports.help = {
  name: "userinfo",
  syntax: "userinfo <@user*>",
  description: "Show the user's information.",
}

module.exports.config = {
  name: "userinfo",
  permissions: []
}
