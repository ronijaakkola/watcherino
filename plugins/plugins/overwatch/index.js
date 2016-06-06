import res from './resources.json';

const heroes = res.heroes

function heroCmd(client, ev, params) {
  let user = ev.message.author;
  if (params.length === 0) {
    ev.message.channel.sendMessage("Hello \n hello");
    ev.message.channel.sendMessage(user.nickMention + ", please specify hero. E.g. !hero McCree");
  }
  else {
    let hero = findHero(params[0]);
    if (hero) {
      ev.message.channel.sendMessage(user.nickMention + ", here is some information about " + hero.hero + "\n" + createInfoMessage(hero));
    }
  }
}

function findHero(hero) {
  console.log(heroes.length);
  for (var i = 0; i < heroes.length; ++i) {
    if (heroes[i].hero.toLowerCase() == hero.toLowerCase())
      return heroes[i];
  }
  return null;
}

function createInfoMessage(hero) {
  let info = "**" + hero.hero + "**\n"
      + "**Role:** " + hero.role + "\n"
      + "**Health:** " + hero.hp + "\n"
      + "**Abilities: **";

  console.log(hero.abilities.length);
  
  let abilities = [];
  let i = 0;
  while (i < hero.abilities.length) {
    abilities += "\n" + hero.abilities[i].key + " - " + hero.abilities[i].name;
    ++i;
  }
  
  return info + abilities;
}

function meleeCmd(client, ev) {
  let user = ev.message.author;
  ev.message.channel.sendMessage(user.nickMention + ", all heroes do 30 melee damage except Reinhardt and Torbjorn who do 75.");
}

function speedCmd(client, ev) {
  let user = ev.message.author;
  ev.message.channel.sendMessage(user.nickMention + ", here is a list of all heroes' movement speeds");
  // TODO: Add the list
}

function chargeCmd(client, ev) {
  let user = ev.message.author;
  ev.message.channel.sendMessage(user.nickMention + ", here is a list of all heroes' ultimate charge speeds");
  // TODO: Add the list
}

export default {
  hero: {
    func: heroCmd,
    desc: "Give information about the given Overwatch hero"
  },
  melee: {
    func: meleeCmd,
    desc: "Give information about heroes' melee damage"
  },
  speed: {
    func: speedCmd,
    desc: "Give information about heroes' movement speed"
  },
  ultimate: {
    func: chargeCmd,
    desc: "Give information about heroes' ultimate charge rates"
  }
};
