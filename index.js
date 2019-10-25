const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('scr/database.json');
const db = low(adapter);
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() == "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  })

});

bot.on("guildCreate", async guild=> {
  db.set(guild.id, []).write()
});

bot.on("ready", async() => {
  bot.prefix = botconfig.prefix;
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity(`${bot.prefix}help`, { type: 0 });
});

bot.on("guildMemberAdd", async member =>{
  console.log(`${member.id} joined the server.`);
  let sconfig = database.get(message.guild.id).find({ id: "configs"}).value();
  let welcomechannel = member.guild.channels.get(`${sconfig.welcome}`);
  let bicon = member.user.displayAvatarURL;
  let userEmbed = new Discord.RichEmbed()
  .setDescription("Welcome!")
  .setColor("#000000")
  .setThumbnail(bicon)
  .addField("Username", member.user.username)
  .addField("Joined On", member.joinedAt);
  let startrole = sconfig[member.guild.id].startrole;
  if(startrole != 0) await(member.addRole(sconfig[member.guild.id].startrole));
  welcomechannel.send(userEmbed);
})

bot.on("guildMemberRemove", async member =>{
  console.log(`${member.id} left the server.`);
  let sconfig = database.get(message.guild.id).find({ id: "configs"}).value();
  let welcomechannel = member.guild.channels.get(`${sconfig.welcome}`);
  let bicon = member.user.displayAvatarURL;
  let userEmbed = new Discord.RichEmbed()
  .setDescription("Bye Bye!")
  .setColor("#000000")
  .setThumbnail(bicon)
  .addField("Username", member.user.username)
  .addField("Joined On", member.joinedAt);
  let startrole = sconfig[member.guild.id].startrole;
  if(startrole != 0) await(member.addRole(sconfig[member.guild.id].startrole));
  welcomechannel.send(userEmbed);
})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel == "dm") return;
  if(!db.get(message.guild.id).find({ id: message.author.id}).value()) db.get(message.guild.id).push({id: message.author.id, coins: 0, warns: 0, xp: 0, level: 1, inv:[]}).write();
  let coinAmt = Math.floor(Math.random() * 10) + 1;
  let baseAmt = Math.floor(Math.random() * 10) + 1;
  if(coinAmt === baseAmt){
    coinAmt += db.get(message.guild.id).find({ id: message.author.id}).value().coins;
    db.get(message.guild.id).find({ id: message.author.id}).assign({coins: coinAmt}).write();
  }

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if(!message.content.startsWith(prefix)) return;
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  let hPermissions = message.member.hasPermission(commandfile.config.permissions);
  if(!hPermissions) message.reply("MIAU MIAU MIAU! (You can't do this!)");

  if(commandfile && hPermissions) commandfile.run(bot, message, args, db, commandfile.config.permissions);
});

bot.login(tokenfile.token);
