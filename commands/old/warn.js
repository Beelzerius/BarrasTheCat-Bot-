const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
//let warns = JSON.parse(fs.readFileSync("./scr/warnings.json", "utf8"));
//let sconfig = JSON.parse(fs.readFileSync("./scr/serversconfig.json", "utf8"));

module.exports.run = async (bot, message, args, database) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("No can do pal!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  if(wUser.hasPermission("BAN_MEMBERS")) return message.reply("They waaaay too kewl");
  let reason = args.join(" ").slice(22);
  let val = database.get(message.guild.id).find({ id: wUser.id}).value();
  let warns = val.warns + 1;
  database.get(message.guild.id).find({ id: wUser.id}).assign({warns: warns}).write();

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Warned User", `<@${wUser.id}>`)
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns)
  .addField("Reason", reason);

  let sconfig = database.get(message.guild.id).find({ id: "configs"}).value();
  let warnchannel = message.guild.channels.get(`${sconfig.report}`);
  if(!warnchannel) return message.reply("Couldn't find report channel");

  warnchannel.send(warnEmbed);

  if(warns == 2){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("You should create that role dude.");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> has been temporarily muted`);
    console.log("Entrou!2");
    setTimeout(function(){
      console.log("Entrou!");
      wUser.removeRole(muterole.id);
      message.channel.send(`<@${wUser.id}> has been unmuted!`);
    }, ms(mutetime));
  }
  if(warns == 5){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> has been banned.`)
  }

}

module.exports.help = {
  name: "warn"
}
