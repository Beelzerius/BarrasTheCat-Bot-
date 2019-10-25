const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args, database) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("No can do pal!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  if(wUser.hasPermission("BAN_MEMBERS")) return message.reply("They waaaay too kewl");
  let reason = args.join(" ").slice(22);
  database.get(message.guild.id).find({ id: wUser.id}).assign({warns: 0}).write();
}

module.exports.help = {
  name: "warnclear"
}
