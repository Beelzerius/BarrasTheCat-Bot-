const Discord = require("discord.js");

module.exports.run = async(bot, message, args, database, perms) => {
  if(!args[1]) return message.reply("MIAU MIAU (Wrong or missing arguments.)");
  let key = args[0];
  let value = args.slice(1).join(" ");
  let up = {};
  up[key] = value;
  let sconfig = database.get(message.guild.id).find({ id: "configs"}).assign(up).write();
  message.reply("MIAU! :3")

}

module.exports.help = {
  name: "set",
  syntax: "set <option> <value>",
  description: "empty",
}

module.exports.config = {
  name: "set",
  permissions: ["ADMINISTRATOR"]
}
