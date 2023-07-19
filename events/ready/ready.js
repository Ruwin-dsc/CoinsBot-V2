const Discord = require("discord.js");
const ms = require('ms')

module.exports = {
  name: "ready",
  once: true,
  execute(bot) {
    let bar, garage, magasin, cinema, gare, mairie;
    
    console.log(`
    /////////////////////////////////////
    //                                 // By WhiteHall (ruwinou)
    //  https://discord.gg/xkebY6nsxk  //
    //                                 //
    ///////////////////://///////////////
    `)

    setInterval(() => {
      bot.db.query(`SELECT * FROM bot WHERE botId = "${bot.user.id}"`, async (err, req) => {
        if(req.length == 0) return;

        if(req[0].type == 'Streaming') {
          bot.user.setPresence({
            activities: [
              {
                name: `${req[0].statut}`,
                type: Discord.ActivityType.Streaming,
                url: 'https://twitch.tv/ruwin2007yt',
              },
            ],
          });
        }

        if(req[0].type == 'Playing') {
          bot.user.setPresence({
            activities: [
              {
                name: `${req[0].statut}`,
                type: Discord.ActivityType.Playing,
              },
            ],
          });
        }

          if(req[0].type == 'Listening') {
            bot.user.setPresence({
              activities: [
                {
                  name: `${req[0].statut}`,
                  type: Discord.ActivityType.Listening,
                },
              ],
            });
          }

          if(req[0].type == 'Watching') {
            bot.user.setPresence({
              activities: [
                {
                  name: `${req[0].statut}`,
                  type: Discord.ActivityType.Watching,
                },
              ],
            });
          }
        if(req[0].type == 'watching') {
            bot.user.setPresence({
              activities: [
                {
                  name: `${req[0].statut}`,
                  type: Discord.ActivityType.Watching,
                },
              ],
            });
          }
      })
    }, 1000)

setInterval(() => {
    bot.guilds.cache.each((guild) => {
      bot.db.query(`SELECT * FROM gain WHERE guildId = "${guild.id}"`, async (err, req) => {
        bar = req[0].bar
        garage = req[0].garage
        magasin = req[0].magasin
        cinema = req[0].cinéma
        gare = req[0].gare
        mairie = req[0].mairie
    guild.members.cache.each((member) => {
      bot.db.query(`SELECT * FROM batiment WHERE guildId = "${guild.id}" AND userId = "${member.id}"`, async (err, req) => {
        if(req.length < 1) return 
        if(req[0].bar == "yes") {
          if(req[0].entrepot == "5000") return
          bot.db.query(`UPDATE batiment SET entrepot = entrepot + ${bar} WHERE guildId = '${guild.id}' AND userId = '${member.id}'`)
        } else if(req[0].garage == "yes") {
          if(req[0].entrepot == "5000") return
          bot.db.query(`UPDATE batiment SET entrepot = entrepot + ${garage} WHERE guildId = '${guild.id}' AND userId = '${member.id}'`)
        } else if(req[0].magasin == "yes") {
          if(req[0].entrepot == "5000") return
          bot.db.query(`UPDATE batiment SET entrepot = entrepot + ${magasin} WHERE guildId = '${guild.id}' AND userId = '${member.id}'`)
        } else if(req[0].cinema == "yes") {
          if(req[0].entrepot == "5000") return
          bot.db.query(`UPDATE batiment SET entrepot = entrepot + ${cinema} WHERE guildId = '${guild.id}' AND userId = '${member.id}'`)
        } else if(req[0].gare == "yes") {
          if(req[0].entrepot == "5000") return
          bot.db.query(`UPDATE batiment SET entrepot = entrepot + ${gare} WHERE guildId = '${guild.id}' AND userId = '${member.id}'`)
        } else if(req[0].mairie == "yes") {
          if(req[0].entrepot == "5000") return
          bot.db.query(`UPDATE batiment SET entrepot = entrepot + ${mairie} WHERE guildId = '${guild.id}' AND userId = '${member.id}'`)
        } else {
          return
        }
      })
    });
  })
  });
}, ms("180m"))

  }
}
