const Discord = require("discord.js")

exports.help = {
    name: "tinfos",
    category: "team",
    aliases: ["teaminfo", "teaminfos", "team"],
    description: "Affiche les informations de la team",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let name, description, coins, reputation, impot, reputrestant, avatarURL = null, bannerURL = null;

    if(!args[0]) { // give perms cmd nrml 
    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const teamid = req[0].team
        if(teamid == 'no') return message.reply(`:x: Vous n'appartenez à aucune team !`)
        bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${teamid}"`, async (err, req) => {
            name = req[0].nom
            description = req[0].description
            coins = req[0].coins
            reputation = req[0].reputation            
            const lockString = convertToLockSymbol(req[0].cadenas);
            if(Number(reputation) < 10 && req[0].avatar == "no") {
              const numberReput = 10 - Number(reputation) 
              reputrestant = `Il manque ${numberReput} reputation de team pour débloquer le logo`
            } else if(Number(reputation) < 20 && req[0].banner == "no") {
              const numberReput = 20 - Number(reputation) 
              reputrestant = `Il manque ${numberReput} reputation de team pour débloquer la bannière`
            } else  {
              reputrestant = `Tous les attributs de team ont été débloqués !`
            }

            if(req[0].avatar !== "yes" || req[0].avatar !== "no") avatarURL = req[0].avatar
            if(req[0].banner !== "yes" || req[0].banner !== "no") bannerURL = req[0].banner
            
            bot.db.query(`SELECT * FROM tmembers WHERE guildId = "${message.guild.id}" AND teamId = "${teamid}"`, async (err, req) => {

                const members = req; 
        const sortedMembers = members.sort((a, b) => {
          const gradeOrder = { Créateur: 0, Officier: 1, Membres: 2 }; 
          const gradeA = a.grade;
          const gradeB = b.grade;
          return gradeOrder[gradeA] - gradeOrder[gradeB];
        });

        let membersList = "";
        sortedMembers.forEach((member) => {
          const grade = member.grade;
          const user = member.userId;
          membersList += `**${grade}** | <@${user}>\n`; 
        });
        impot = Number(req.length) * 60
    const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: `Informations de la team ${name}`})
    .setDescription(`**Nom:** ${name}\n**Description:** ${description}\n**Argent:** \`${coins}\`\n**Réputation:** \`${reputation}\`\n**Impôt/Jour:** \`${impot}\`\n**ID:** ${teamid}\n\n${lockString}\n\n__Membres (${req.length}):__\n${membersList}`)
    .setFooter({ text: reputrestant})
    .setColor(color)
    .setThumbnail(avatarURL)
    .setImage(bannerURL)
    message.channel.send({ embeds: [embed] })
            })
        })
    })
  } else {
        const teamid = args[0]
        bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${teamid}"`, async (err, req) => {
          if(req.length < 1) return message.channel.send(`:x: Team introuvable !`)
            name = req[0].nom
            description = req[0].description
            coins = req[0].coins
            reputation = req[0].reputation            
            const lockString = convertToLockSymbol(req[0].cadenas);
            if(Number(reputation) < 10 && req[0].avatar == "no") {
              const numberReput = 10 - Number(reputation) 
              reputrestant = `Il manque ${numberReput} reputation de team pour débloquer le logo`
            } else if(Number(reputation) < 20 && req[0].banner == "no") {
              const numberReput = 20 - Number(reputation) 
              reputrestant = `Il manque ${numberReput} reputation de team pour débloquer la bannière`
            } else  {
              reputrestant = `Tous les attributs de team ont été débloqués !`
            }

            if(req[0].avatar !== "yes" || req[0].avatar !== "no") avatarURL = req[0].avatar
            if(req[0].banner !== "yes" || req[0].banner !== "no") bannerURL = req[0].banner
            
            bot.db.query(`SELECT * FROM tmembers WHERE guildId = "${message.guild.id}" AND teamId = "${teamid}"`, async (err, req) => {

                const members = req; 
        const sortedMembers = members.sort((a, b) => {
          const gradeOrder = { Créateur: 0, Officier: 1, Membres: 2 }; 
          const gradeA = a.grade;
          const gradeB = b.grade;
          return gradeOrder[gradeA] - gradeOrder[gradeB];
        });

        let membersList = "";
        sortedMembers.forEach((member) => {
          const grade = member.grade;
          const user = member.userId;
          membersList += `**${grade}** | <@${user}>\n`; 
        });
        impot = Number(req.length) * 60
    const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: `Informations de la team ${name}`})
    .setDescription(`**Nom:** ${name}\n**Description:** ${description}\n**Argent:** \`${coins}\`\n**Réputation:** \`${reputation}\`\n**Impôt/Jour:** \`${impot}\`\n**ID:** ${teamid}\n\n${lockString}\n\n__Membres (${req.length}):__\n${membersList}`)
    .setFooter({ text: reputrestant})
    .setColor(color)
    .setThumbnail(avatarURL)
    .setImage(bannerURL)
    message.channel.send({ embeds: [embed] })
            })
        })

}}

function convertToLockSymbol(number) {
  const lockSymbol = "`🔒` ";
  let lockString = "";
  for (let i = 0; i < number; i++) {
    lockString += lockSymbol;
  }
  return lockString;
}