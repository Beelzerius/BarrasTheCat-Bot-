const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(bot, message, args, database) => {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Couldn't find user.");
  let reason = args.join(" ").slice(22);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No can do pal!");
  if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#ff9900")
  .addField("Kicked User",`${kUser} with ID ${kUser.id}`)
  .addField("Kicked By", `${message.author} with ID ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", reason);

  let sconfig = database.get(message.guild.id).find({ id: "configs"}).value();
  let kickChannel = message.guild.channels.get(`${sconfig.report}`);
  if(!kickChannel) return message.reply("Couldn't find report channel");

  message.delete();
  kUser.kick(reason);
  kickChannel.send(kickEmbed)
  return;
}

module.exports.help = {
  name: "kick"
}
