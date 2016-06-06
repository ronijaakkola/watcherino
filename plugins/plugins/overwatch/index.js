import res from './resources.json';

function heroCmd(client, msg, params) {
  msg.channel.sendMessage(res.about);
}

export default {
  hero: {
    func: heroCmd,
    desc: "Give information about the given Overwatch hero"
  }
};
