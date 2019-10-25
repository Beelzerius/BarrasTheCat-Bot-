const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot, message, args, database, perms) => {
  let {body} = await superagent
  .get("http://yerkee.com/api/fortune");
  message.channel.send(body.fortune);
 
}

module.exports.help = {
  name: "fortune",
  syntax: "fortune",
  description: "Open a Fortune Cookie!",
}

module.exports.config = {
  name: "fortune",
  permissions: []
}
