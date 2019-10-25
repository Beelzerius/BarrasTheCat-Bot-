const Discord = require("discord.js");
const fs = require("fs");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('scr/database.json');
const database = low(adapter);

exports.add = function (guild, user, itemid, amount = 1) {
  let data = database.get(guild).find({ id: user});
  let inv = data.value().inv;
  let end = false;
  inv.forEach(v => {
    if(v["id"] == itemid) {
        v["qtd"] += amount;
        data.assign({inv: inv}).write();
        end = true;
      }
    });
    if(!end){
      inv.push({id: itemid, qtd: amount});
      data.assign({inv: inv}).write();
    }
  return end;
};
exports.inv = function (guild, user) {
  let data = database.get(guild).find({ id: user});
  let inv = data.value().inv;
  return inv;
};
exports.invClear = function (guild, user) {
  let data = database.get(guild).find({ id: user});
  data.assign({inv: []}).write();
  return true;
};

exports.remove = function (guild, user, itemid, amount = 1) {
  let data = database.get(guild).find({ id: user});
  let inv = data.value().inv;
  inv.forEach(v => {
    if(v["id"] == itemid) return true;
  });
  return false;
};
exports.has = function (guild, user, itemid, amount = 1) {
  let data = database.get(guild).find({ id: user});
  let inv = data.value().inv;
  let has = false;
  inv.forEach(v => {
    if(v["id"] == itemid && v["qtd"] >= amount) {
        has = true;
      }
    });
  return has;
};

exports.getItem = function (guild, itemid) {
  let data = database.get(guild).find({ id: "itens"});
  if(!data){
    database.get(guild).push({id: "itens", itens: [], aid: 0}).write();
  }
  return data.get("itens").find({id: itemid}).value();
};

exports.newItem = function (guild, name, desc, image, price) {
  let data = database.get(guild).find({ id: "itens"});
  if(!data){
    database.get(guild).push({id: "itens", itens: [], aid: 0}).write();
  }
  aid = data.value().aid;
  data.get("itens").push({id: aid, name: name, desc: desc, image: image, price: price}).write();
  data.assign({aid: aid+1}).write();
  return aid;
};
