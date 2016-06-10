import res from './resources.json';

function aboutCmd(client, ev) {
  ev.message.channel.sendMessage(res.about);
}

export default {
  about: {
    func: aboutCmd,
    usage: "",
    desc: "Info about Watcherino bot"
  }
};
