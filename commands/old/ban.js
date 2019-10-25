const Discord = require("discord.js");
const fs = require("fs");
let sconfig = JSON.parse(fs.readFileSync("./scr/serversconfig.json", "utf8"));

module.exports.run = async(bot, message, args, database) => {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Couldn't find user.");
  let reason = args.join(" ").slice(22);
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");
  if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be baned!");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#ff9900")
  .addField("Baned User",`${bUser} with ID ${bUser.id}`)
  .addField("Baned By", `${message.author} with ID ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", reason);

  let sconfig = database.get(message.guild.id).find({ id: "configs"}).value();
  let banChannel = message.guild.channels.get(`${sconfig.report}`);
  if(!banChannel) return message.reply("Couldn't find report channel");

  message.delete();
  bUser.ban(reason);
  banChannel.send(banEmbed)
  return;
}

module.exports.help = {
  name: "ban"
}
