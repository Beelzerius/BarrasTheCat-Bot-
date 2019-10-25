const Discord = require("discord.js");
const fs = require("fs");
let sconfig = JSON.parse(fs.readFileSync("./scr/serversconfig.json", "utf8"));

module.exports.run = async(bot, message, args, database) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Couldn't find user.");
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  .setColor("#eee507")
  .addField("Reported User", `${rUser} with ID ${rUser.id}`)
  .addField("Report By", `${message.author} with ID ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", reason);

  let sconfig = database.get(message.guild.id).find({ id: "configs"}).value();
  let reportschannel = message.guild.channels.get(`${sconfig.report}`);
  if(!reportschannel) return message.reply("Couldn't find report channel");

  message.delete();
  reportschannel.send(reportEmbed);

  return;
}

module.exports.help = {
  name: "report"
}
