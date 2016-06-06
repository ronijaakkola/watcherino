import res from './resources.json';

function heroCmd(client, msg, params) {
  let ans = res.heroes[2].abilities[3].name;
  msg.channel.sendMessage(ans);
}

export default {
  hero: {
    func: heroCmd,
    desc: "Give information about the given Overwatch hero"
  }
};
