const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("node-superfetch");
const Inv = require("../libs/inventory");

module.exports.run = async(bot, message, args, database, perms) => {
  let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!user) user = message.author;
  let val = database.get(message.guild.id).find({ id: user.id}).value();
  let level = 1;
  if(val) level = val.level;

  const canvas = Canvas.createCanvas(250, 250);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = "rgb(44, 45, 55)";
  ctx.fillRect(0, 0, 250, 250);

  const {body: a} = await snekfetch.get(message.guild.member(user).user.avatarURL);
  const avatar = await Canvas.loadImage(a);
  ctx.drawImage(avatar, 10, 10, 230, 230);

  const attach = new Discord.Attachment(canvas.toBuffer(), 'avatar.png');

  message.channel.send(attach);
}

module.exports.help = {
  name: "canvas",
  syntax: "canvas <@user>",
  description: "WIP",
}

module.exports.config = {
  name: "canvas",
  permissions: []
}
