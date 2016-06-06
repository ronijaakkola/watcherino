import res from './resources.json';

function aboutCmd(client, ev) {
  ev.message.channel.sendMessage(res.about);
}

export default {
  about: {
    func: aboutCmd,
    desc: "Info about Watcherino bot"
  }
};
