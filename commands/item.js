const Discord = require("discord.js");
const Inv = require("../libs/inventory");

module.exports.run = async(bot, message, args, database, perms) => {
  if(!args[0]) return message.reply("MIAU MIAU! (Missing arguments!)");
  let flag = false;
  if(args[0].startsWith('-')) flag = args[0].slice(1);
  if(!flag){
    let item = Inv.getItem(message.guild.id, parseInt(args[0]));
    if(!item) message.reply("Item not found!");
    let embed = new Discord.RichEmbed()
    .setTitle(item.name)
    .setDescription(item.desc)
    .setColor("#000000")
    .setThumbnail(item.image)
    .setFooter(`Price: ${item.price}$`);
    return message.channel.send(embed);
  }else{
     if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("MIAU! (NO!)");
     switch (flag) {
       case 'c':
        if(!args[4]) return message.reply("item -c <name> <image> <price> <desc>");
            let desc = args.slice(4).join(" ");
            let iid = Inv.newItem(message.guild.id, args[1], desc, args[2], args[3]);
            return message.reply(`The item has been create with id ${iid}`);
         break;
       case 'g':
            if(!args[3]) return message.reply("item -g <@user> <id> <qtd>");
            Inv.add(message.guild.id, message.guild.members.get(args[1].slice(2, -1)).user.id, args[2], args[3]);
            return message.reply("The item has been given!");
         break;
       case 'ra':
            if(!args[1]) return message.reply("item -ra <@user>");
            Inv.invClear(message.guild.id, message.guild.members.get(args[1].slice(2, -1)).user.id);
            return message.reply("The inventory has been cleared!");
         break;
       default:
        return message.reply("MIAU??");
     }
  }
}

module.exports.help = {
  name: "item",
  syntax: "item <itemId>",
  description: "item",
}

module.exports.config = {
  name: "item",
  permissions: []
}
