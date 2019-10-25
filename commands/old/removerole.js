const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Couldn't find user.");
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You can't do this!");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Wrong or missing arguments!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Wrong or missing arguments!");

  if(!rUser.roles.has(gRole.id)) return message.reply("They don't have that role.");
  await(rUser.removeRole(gRole.id));

  try{
    await rUser.send(`RIP, you lost the ${gRole.name} role.`)
  }catch(e){
    message.channel.send(`RIP to @<${rUser.id}>, we remove ${gRole.name} from them. We tried to DM them, but their DMs are locked.`)
  }
}

module.exports.help = {
  name: "removerole"
}
