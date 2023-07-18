const Discord = require("discord.js");

module.exports = {
  name: "ready",
  async execute(bot) {
  setInterval(() => {
    bot.guilds.cache.forEach((guild) => {
      bot.db.query(`SELECT * FROM gain WHERE guildId = ${guild.id}`, async (err, req) => {

        const gainvoc = req[0].vocal
        const gaincam = req[0].cam
        const gainstream = req[0].stream
        const gaincamstream = Number(gaincam) + Number(gainstream)

      guild.members.cache.forEach((member) => {
        const voiceState = member.voice;
        if (!voiceState || !voiceState.channel) {
          return;
        }
        bot.db.query(`SELECT * FROM user WHERE guildId = "${guild.id}" AND userId = "${member.id}"`, async (err, req) => {
          if(req[0].vocal == "off") return

        const cameraOn = voiceState.selfVideo || voiceState.selfCamera;
        const streaming = voiceState.streaming;
        const isVocal = !cameraOn && !streaming;

        if (cameraOn && streaming) {
          bot.db.query(`UPDATE user SET coins = coins + ${Number(gaincamstream)} WHERE guildId = "${guild.id}" AND userId = "${member.id}"`);
        } else if (cameraOn) {
          bot.db.query(`UPDATE user SET coins = coins + ${Number(gaincam)} WHERE guildId = "${guild.id}" AND userId = "${member.id}"`);
        } else if (streaming) {
          bot.db.query(`UPDATE user SET coins = coins + ${Number(gainstream)} WHERE guildId = "${guild.id}" AND userId = "${member.id}"`);
        } else if (isVocal) {
          bot.db.query(`UPDATE user SET coins = coins + ${Number(gainvoc)} WHERE guildId = "${guild.id}" AND userId = "${member.id}"`);
        }

      })
      });
    })
    });
  }, 15 * 60 * 1000); 
}};
