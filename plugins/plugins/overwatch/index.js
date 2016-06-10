import res from './resources.json';

const heroes = res.heroes

function heroCmd(client, ev, params) {
  let user = ev.message.author;
  if (params.length === 0) {
    ev.message.channel.sendMessage(user.nickMention + ", please specify a hero. E.g. !hero McCree");
  }
  else {
    let hero = findHero(params[0]);
    if (hero) {
      ev.message.channel.sendMessage(user.nickMention + ", here is some information about " + hero.hero + "\n" + createInfoMessage(hero));
    }
    else {
      // TODO: Make the hero search better or suggest heroes
      ev.message.channel.sendMessage("Sorry " + user.nickMention + ", I could not find a hero named " + params[0] + ".");
    }
  }
}

function healthCmd(client, ev, params) {
  let user = ev.message.author;
  if (params.length === 0) {
    ev.message.channel.sendMessage(user.nickMention + ", please specify a hero. E.g. !hp McCree");
  }
  else {
    let hero = findHero(params[0]);
    if (hero) {
      ev.message.channel.sendMessage(user.nickMention + ", " + hero.hero + " has **" + hero.hp + "**.");
    }
    else {
      // TODO: Make the hero search better or suggest heroes
      ev.message.channel.sendMessage("Sorry " + user.nickMention + ", I could not find a hero named " + params[0] + ".");
    }
  }
}

// TODO: Extract this to helpers file
function findHero(hero) {
  for (var i = 0; i < heroes.length; ++i) {
    if (heroes[i].hero.toLowerCase() == hero.toLowerCase())
      return heroes[i];
  }
  return null;
}

// TODO: Extract this to helpers file
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

// TODO: Extract this to helpers file
function createAbilityMessage(a) {
  let ability = "**" + a.key + " - " + a.name + "**\n";
  if (a.damage != "") ability += "Damage: " + a.damage + "\n";
  if (a.headshot != "") ability += "Headshot: " + a.headshot + "\n";
  if (a.ammo != "") ability += "Ammo: " + a.ammo + "\n";
  if (a.firerate != "") ability += "Fire rate: " + a.firerate + "\n";
  if (a.casttime != "") ability += "Cast time: " + a.casttime + "\n";
  if (a.duration != "") ability += "Duration: " + a.duration + "\n";
  if (a.cooldownreload != "") ability += "Cooldown/reload: " + a.cooldownreload + "\n";
  if (a.heals != "") ability += "Heals: " + a.heals + "\n";
  if (a.shieldstrength != "") ability += "Shield strength: " + a.shieldstrength + "\n";
  if (a.range != "") ability += "Range: " + a.range + "\n";
  if (a.notes != "") ability += "Notes: " + a.notes + "\n";
  
  return ability;
}

// TODO: Extract this to helpers file
function createAbilitiesMessage(abs) {
  let abilities = "";
  for (var i = 0; i < abs.length; ++i) {
    abilities += createAbilityMessage(abs[i]);
  }
  return abilities;
}

function abilitiesCmd(client, ev, params) {
  let user = ev.message.author;
  if (params.length === 0) {
    ev.message.channel.sendMessage(user.nickMention + ", please specify a hero. E.g. !abilities McCree");
  }
  else {
    let hero = findHero(params[0]);
    if (hero) {
      ev.message.channel.sendMessage(user.nickMention + ", here are the abilities of " + hero.hero + "\n" + createAbilitiesMessage(hero.abilities));
    }
    else {
      // TODO: Make the hero search better or suggest heroes
      ev.message.channel.sendMessage("Sorry " + user.nickMention + ", I could not find a hero named " + params[0] + ".");
    }
  }
}

// TODO: Extract this to helpers file
function findAbility(key, abs) {
  for (var i = 0; i < abs.length; ++i) {
    if (abs[i].key.toLowerCase() == key.toLowerCase())
      return abs[i];
  }
  return null;
}

function abilityCmd(client, ev, params) {
  let user = ev.message.author;
  if (params.length != 2) {
    ev.message.channel.sendMessage(user.nickMention + ", please specify a hero and ability slot. E.g. !ability McCree <LM|RM|E|Shift|Q>");
  }
  else {
    let hero = findHero(params[0]);
    if (hero) {
      let ability = findAbility(params[1], hero.abilities);
      if (ability) {
        ev.message.channel.sendMessage(user.nickMention + ", here is the ability " + params[1]  + " of " + hero.hero + "\n" + createAbilityMessage(ability));
      }
      else {
        ev.message.channel.sendMessage("Sorry " + user.nickMention + ", I could not find an ability slot " + params[1] + " from " + hero.hero + ".");
      }
    }
    else {
      // TODO: Make the hero search better or suggest heroes
      ev.message.channel.sendMessage("Sorry " + user.nickMention + ", I could not find a hero named " + params[0] + ".");
    }
  }
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
    usage: "<hero>",
    desc: "Show information about the given Overwatch hero"
  },
  abilities: {
    func: abilitiesCmd,
    usage: "<hero>",
    desc: "Show information about the abilities of the given Overwatch hero"
  },
  skills: {
    func: abilitiesCmd,
    usage: "<hero>",
    desc: "Show information about the abilities of the given Overwatch hero"
  },
  ability: {
    func: abilityCmd,
    usage: "<hero> <ability slot>",
    desc: "Show information about the ability of the given Overwatch hero"
  },
  skill: {
    func: abilityCmd,
    usage: "<hero> <ability slot>",
    desc: "Show information about the ability of the given Overwatch hero"
  },
  hp: {
    func: healthCmd,
    usage: "<hero>",
    desc: "Show how much health the given hero has"
  },
  melee: {
    func: meleeCmd,
    usage: "",
    desc: "Give information about heroes' melee damage"
  },
  /*
  speed: {
    func: speedCmd,
    usage: "",
    desc: "Give information about heroes' movement speed"
  },
  ultimate: {
    func: chargeCmd,
    usage: "",
    desc: "Give information about heroes' ultimate charge rates"
  }
  */
};
