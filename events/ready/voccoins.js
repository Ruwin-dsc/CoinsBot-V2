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
        bot.db.query(`SELECT * FROM user WHERE guildId = "${member.guild.id}" AND userId = "${member.id}"`, async (err, req) => {
          if(req.length < 1) return
          if(req[0].vocal == "off") return

        const cameraOn = voiceState.selfVideo || voiceState.selfCamera;
        const streaming = voiceState.streaming;
        const isVocal = !cameraOn && !streaming;

        if (cameraOn && streaming) {
          bot.db.query(`UPDATE user SET coins = coins + ${Number(gaincamstream)} WHERE guildId = "${guild.id}" AND userId = "${member.id}"`);
          bot.db.query(`SELECT * FROM logs WHERE guildId = "${member.guild.id}"`, async (err, req) => {
            const voc = req[0].logsvocal
            if(!voc) return
            if(voc == null) return
            const channelvoc = bot.channels.cache.get(voc);
            if(!channelvoc) return
            bot.db.query(`SELECT * FROM user WHERE guildId = "${member.guild.id}" AND userId = "${member.id}"`, async (err, req) => {
            const embedLogs = new Discord.EmbedBuilder()
            .setAuthor({ name: `${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }), url: 'https://discord.gg/zcN3sB5KSv' })
            .setDescription(`${member} vient de gagner \`${gaincamstream} coins\` en étant en \`vocal, caméra, stream\``)
            .setTimestamp()
            .setColor(req[0].color)

            channelvoc.send({ embeds: [embedLogs] })
            })

          })
        } else if (cameraOn) {
          bot.db.query(`UPDATE user SET coins = coins + ${Number(gaincam)} WHERE guildId = "${guild.id}" AND userId = "${member.id}"`);
          bot.db.query(`SELECT * FROM logs WHERE guildId = "${member.guild.id}"`, async (err, req) => {
            const voc = req[0].logsvocal
            if(!voc) return 
            if(voc == null) return
            const channelvoc = bot.channels.cache.get(voc);
            if(!channelvoc) return
            bot.db.query(`SELECT * FROM user WHERE guildId = "${member.guild.id}" AND userId = "${member.id}"`, async (err, req) => {
            const embedLogs = new Discord.EmbedBuilder()
            .setAuthor({ name: `${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }), url: 'https://discord.gg/zcN3sB5KSv' })
            .setDescription(`${member} vient de gagner \`${gaincam} coins\` en étant en \`caméra\``)
            .setTimestamp()
            .setColor(req[0].color)

            channelvoc.send({ embeds: [embedLogs] })
            })

          })
        } else if (streaming) {
          bot.db.query(`UPDATE user SET coins = coins + ${Number(gainstream)} WHERE guildId = "${guild.id}" AND userId = "${member.id}"`);
          bot.db.query(`SELECT * FROM logs WHERE guildId = "${member.guild.id}"`, async (err, req) => {
            const voc = req[0].logsvocal
            if(!voc) return
            if(voc == null) return
            const channelvoc = bot.channels.cache.get(voc);
            if(!channelvoc) return
            bot.db.query(`SELECT * FROM user WHERE guildId = "${member.guild.id}" AND userId = "${member.id}"`, async (err, req) => {
            const embedLogs = new Discord.EmbedBuilder()
            .setAuthor({ name: `${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }), url: 'https://discord.gg/zcN3sB5KSv' })
            .setDescription(`${member} vient de gagner \`${gainstream} coins\` en étant en \`stream\``)
            .setTimestamp()
            .setColor(req[0].color)

            channelvoc.send({ embeds: [embedLogs] })
            })

          })
        } else if (isVocal) {
          bot.db.query(`UPDATE user SET coins = coins + ${Number(gainvoc)} WHERE guildId = "${guild.id}" AND userId = "${member.id}"`);
          bot.db.query(`SELECT * FROM logs WHERE guildId = "${member.guild.id}"`, async (err, req) => {
            const voc = req[0].logsvocal
            if(!voc) return
            if(voc == null) return
            const channelvoc = bot.channels.cache.get(voc);
            if(!channelvoc) return
            bot.db.query(`SELECT * FROM user WHERE guildId = "${member.guild.id}" AND userId = "${member.id}"`, async (err, req) => {
            const embedLogs = new Discord.EmbedBuilder()
            .setAuthor({ name: `${member.user.username}`, iconURL: member.user.displayAvatarURL({ dynamic: true }), url: 'https://discord.gg/zcN3sB5KSv' })
            .setDescription(`${member} vient de gagner \`${gainvoc} coins\` en étant en \`vocal\``)
            .setTimestamp()
            .setColor(req[0].color)

            channelvoc.send({ embeds: [embedLogs] })
            })

          })
        }

      })
      });
    })
    });
  }, 15 * 60 * 1000); 
}};

