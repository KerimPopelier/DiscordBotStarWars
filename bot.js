const token = require("./token.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const quotes = ["Do. Or do not. There is no try", "I find your lack of faith disturbing", "The Force will be with you. Always.", "No. I am your father.", "POWER! UNLIMITED POWER!", "DEW IT!"];
const gif = ["https://tenor.com/view/star-wars-darth-vader-dance-dancing-happy-gif-4289259", "https://tenor.com/view/anakin-darth-vader-gif-5233555", "https://tenor.com/view/yoda-muchtolearn-starwars-gif-10182983"];
const JediCode = "\nThere is no emotion, there is peace. \nThere is no ignorance, there is knowledge. \nThere is no passion, there is serenity. \nThere is no chaos, there is harmony. \nThere is no death, there is the Force";
const SithCode = "\nPeace is a lie. \nThere is only Passion. \nThrough Passion I gain Strength. \nThrough Strength I gain Power. \nThrough Power I gain Victory. \nThrough Victory my chains are Broken. \nThe Force shall free me.";
var Padawan = "";
var Jedi = "";
var Apprentice = "";
var Sith = "";

client.on('message', msg => {
    setRoles(msg);
    if (msg.content.substring(0,1) == "!") {
        router(msg);
    }
});

function router(msg) {
    switch(msg.content.substring(1)) {
        case "quote":
            quote(msg);
            break;
        case "jedi":
            jedi(msg);
            break;
        case "sith":
            sith(msg);
            break;
        case "code":
            code(msg);
            break;
        case "leave":
            leave(msg);
            break;
        case "gif":
            giff(msg);
            break;
        default:
            msg.reply("\nCommands:\n!quote for a quote; \n!gif to get a Star war gif; \n!jedi to join the Jedi; \n!sith to join the Sith; \n!code to get the Code of the order you belong to; \n!leave to leave your current order;");
    }
}

function quote(msg) {
    msg.reply(quotes[Math.floor(Math.random() * quotes.length)]);
}

function giff(msg) {
    msg.channel.send(gif[Math.floor(Math.random() * gif.length)]);
}

function jedi(msg) {
    msg.member.roles.add(Padawan);
    msg.member.roles.add(Jedi);
    msg.reply("There is no emotion, there is peace!");
}

function sith(msg) {
    msg.member.roles.add(Apprentice);
    msg.member.roles.add(Sith);
    msg.reply("Peace is a lie. There is only passion!");
}

function code(msg) {
    if (msg.member.roles.cache.find(role => role === Jedi)) {
        msg.channel.send(JediCode);
    } else if (msg.member.roles.cache.find(role => role === Sith)) {
        msg.channel.send(SithCode);
    } else {
        msg.reply("You need to join an order to see the code");
    }
}

function leave(msg) {
    if (msg.member.roles.cache.find(role => role === Jedi)) {
        msg.member.roles.remove(Padawan);
        msg.member.roles.remove(Jedi);
        msg.reply("You have fallen to the dark side my Padawan!");
    } else if (msg.member.roles.cache.find(role => role === Sith)) {
        msg.member.roles.remove(Apprentice);
        msg.member.roles.remove(Sith);
        msg.reply("We will hunt you down Jedi!");
    } else {
        msg.reply("You need to join an order to leave it");
    }
}

function setRoles(msg) {
    if (Jedi === "") {
        Padawan = msg.guild.roles.cache.find(role => role.name === "Padawan");
        Jedi = msg.guild.roles.cache.find(role => role.name === "Jedi");
        Apprentice = msg.guild.roles.cache.find(role => role.name === "Apprentice");
        Sith = msg.guild.roles.cache.find(role => role.name === "Sith");
    }
}

client.login(token.token);