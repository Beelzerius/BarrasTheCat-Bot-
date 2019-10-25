const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(bot, message, args, database, perms) => {
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!user) return message.reply("User not found");
  if(user.hasPermission(perms)) return message.reply("MIAU MIAU MIAU MIAU! (You can't do this with this user!)");

  if(!args[1]) return message.reply("MIAU MIAU! (Missing arguments!)");
  let reason = args.slice(1).join(" ");

  let sconfig = database.get(message.guild.id).find({ id: "configs"}).value();
  let rchannel = message.guild.channels.get(`${sconfig.report}`);
  if(!rchannel) return message.reply("MIAU MIAU MIAU. (Couldn't find report channel.)");

  let data = database.get(message.guild.id).find({ id: user.id});
  let warns = data.value().warns + 1;

  data.update('warns', n => n + 1).write();

  let embed = new Discord.RichEmbed()
  .setTitle("Warns")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Warned User", `<@${user.id}>`)
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns)
  .addField("Reason", reason);
  rchannel.send(embed);

  if(warns == 2){
    let muterole = message.guild.roles.get(`${sconfig.mute}`);
    if(!muterole) return message.reply("MIAU MIAU. (Mute role don't find.)");
    let mutetime = "10s";
    await(user.addRole(muterole.id));
    message.channel.send(`<@${user.id}> has been temporarily muted`);
    setTimeout(function(){
      user.removeRole(muterole.id);
      message.channel.send(`<@${user.id}> has been unmuted!`);
    }, ms(mutetime));
  }
  if(warns >= 5){
    message.guild.member(user).ban("Too Much Warnings");
    message.reply(`<@${user.id}> has been banned.`)
  }

  return;


}

module.exports.help = {
  name: "warn",
  syntax: "warn @<user> <reason>",
  description: "Give a warn to user.",
}

module.exports.config = {
  name: "warn",
  permissions: ["BAN_MEMBERS", "KICK_MEMBERS"]
}
