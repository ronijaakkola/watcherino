"use strict";

import chalk from 'chalk';
import Discordie from 'discordie'

import config from "./config/config.json";
import responses from "./resources/responses.json";

var commands = require("./plugins");

const client = new Discordie()
let inited = false;
let helpText = "";

function onMessage(ev) {
  // Ignore empty messages and messages from this bot
  if (!ev.message) return;
  if (client.User.id === ev.message.author.id) return;
  
  let msg = ev.message;
  if (msg.content[0] === config.prefix) {
    let command = msg.content.toLowerCase().split(' ')[0].substring(1);

    // Print the help message
    if (command == "help") {
      printHelpMsg(ev);
      return;
    }

    let params = msg.content.substring(command.length + 2).split(' ').filter(function(el) {return el.length != 0});
    let cmd = commands.default[command];

    // If command was found from the plugins, call its function
    if (cmd) {
      cmd.func(client, ev, params);
    }
    else {
      let user = msg.author;
      msg.channel.sendMessage(user.nickMention + ", I do not know that command. Type *!help* to see all available commands.");
    }
    return;
  }

  // See if the name of the bot was mentioned
  if (client.User.isMentioned(msg)) {
    console.log(chalk.cyan('Bot mentioned!'));
    var ans = responses.answers[ Math.floor(Math.random() * (responses.answers.length)) ]
    msg.channel.sendMessage(ans);
    return;
  }
}

// TODO: Does this get called for each server individually?
function onPresence(ev) {
  let user = ev.user;
  if (user.previousGameName != "Overwatch" && user.gameName == "Overwatch") {
    let greet = responses.greetings[ Math.floor(Math.random() * (responses.greetings.length)) ];
    var presence = Math.random() < 0.5 ? "." : ", "
        + responses.presence[ Math.floor(Math.random() * (responses.presence.length)) ];;
    //console.log(greet + " " + ev.user.nickMention + " just started playing Overwatch" + presence);

    // TODO: Clean this up.
    if (ev.guild.textChannels.length > 0) {
      let c = ev.guild.textChannels[0];
      c.sendMessage(greet + " " + ev.user.nickMention + " just started playing Overwatch" + presence);
    }
  } 
}

function buildHelpText() {
  let c = commands.default;
  for (var key in c) {
    helpText += "**!" + key + " " + c[key].usage + "**\n" + "  " + c[key].desc + "\n";
  }
}

function printHelpMsg(ev) {
  let user = ev.message.author;
  ev.message.channel.sendMessage(user.nickMention + ", here are all the available commands\n" + helpText);
}

function connect() {
  if (config.token == "" || config.bot_id == "") {
    console.error('Watcherino needs token and bot_id to be setup in config.js!');
    process.exit(1);
  }
  
  buildHelpText();
  
  client.connect({token: config.token});
}

function forceFetchUsers() {
  console.log("Force fetching users..");
  client.Users.fetchMembers();
}

// Listen for events on Discord
client.Dispatcher.on('GATEWAY_READY', () => {
  console.log("Started successfully.");
  setTimeout(() => forceFetchUsers(), 45000);

  if (!inited) {
    inited = true;

    // Set up handlers
    client.Dispatcher.on('MESSAGE_CREATE', onMessage);
    client.Dispatcher.on('MESSAGE_UPDATE', onMessage);
    client.Dispatcher.on('PRESENCE_UPDATE', onPresence);
  }
});

client.Dispatcher.on('DISCONNECTED', () => {
    console.log("Disconnected. Reconnecting..");
  setTimeout(() => {
    connect();
  }, 2000);
});

connect();
