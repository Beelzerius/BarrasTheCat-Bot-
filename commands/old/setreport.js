const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let sconfig = JSON.parse(fs.readFileSync("./scr/serversconfig.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No can do pal!");

  if(!sconfig[message.guild.id]) sconfig[message.guild.id] = {
    welcomechannel: 0,
    muterole: 0,
    reportchannel: 0,
    startrole: 0
  };

  sconfig[message.guild.id].reportchannel = message.channel.id;

  fs.writeFile("./scr/serversconfig.json", JSON.stringify(sconfig), (err) => {
    if (err) console.log(err)
  });

  message.reply("Report Channel defined!")
};


module.exports.help = {
  name: "setreport"
}
