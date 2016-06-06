"use strict";

import chalk from 'chalk';
import Discordie from 'discordie'

import config from "./config/config.json";
import responses from "./resources/responses.json";

var commands = require("./plugins");

const client = new Discordie()
let inited = false;

function onMessage(event) {
  // Ignore empty messages and messages from this bot
  if (!event.message) return;
  if (client.User.id === event.message.author.id) return;
  
  let msg = event.message;
  if (msg.content[0] === config.prefix) {
    let command = msg.content.toLowerCase().split(' ')[0].substring(1);
    let params = msg.content.substring(command.length + 2).split(' ').filter(function(el) {return el.length != 0});
    let cmd = commands.default[command];

    console.log("Command: " + command);
    console.log("Parameter(s): " + params);

    // If command was found from the plugins, call its function
    if (cmd) 
      cmd.func(client, event, params);
    return;
  }

  // See if the name of the bot was mentioned
  if (client.User.isMentioned(msg)) {
    console.log(chalk.cyan('Bot mentioned!'));
    // FIXME: not random
    var ans = responses.answers[ Math.floor(Math.random() * (responses.answers.length)) ]
    msg.channel.sendMessage(ans);

    return;
  }
}

function connect() {
  /*
  if (!config.token || !config.bot_id) {
    console.error('Watcherino needs token and bot_id to be setup in config.js!');
    process.exit(1);
  }
  */

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

    client.Dispatcher.on('MESSAGE_CREATE', onMessage);
    client.Dispatcher.on('MESSAGE_UPDATE', onMessage);
  }
});

client.Dispatcher.on('DISCONNECTED', () => {
    console.log("Disconnected. Reconnecting..");
  setTimeout(() => {
    connect();
  }, 2000);
});

connect();
