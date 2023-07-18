const Discord = require("discord.js")

exports.help = {
    name: "helpall",
    category: "gestioncoins",
    aliases: ["help-all"],
    description: "Affiche l'ensemble des commandes en une page",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    bot.db.query(`SELECT * FROM gain WHERE guildId = ${message.guild.id}`, async (err, req) => {
    let gainvoc, gaincam, gainstream
    gainvoc = req[0].vocal
    if(gainvoc == "0") gainvoc = "rien coins"
    gainstream = req[0].stream
    if(gainstream == "0") gainstream = "rien coins"
    gaincam = req[0].cam
    if(gaincam == "0") gaincam = "rien coins"

    const embedHelp = new Discord.EmbedBuilder() 
    .setAuthor({ name: `Page d'aide des commandes`, iconURL: `https://media.discordapp.net/attachments/851876715835293736/852647593020620877/746614051601252373.png`, url: 'https://discord.gg/zcN3sB5KSv' })
    .setDescription(`Prefix du serveur: \`${bot.prefix}\`\nUtilisez \`${bot.prefix}help [commande]\` pour obtenir des informations sur une commande\n\n**:coin: • Gestion des coins :**\ncoins, profil, top, pay, with, dep, rep\n**:game_die: • Jeux**\nwork, daily, slut, gift, mine, rob\n**:rocket: • Mini-jeux**\nroulette, blackjack, gunfight, slots, pfc, power4\n**:black_joker: • Cartes**\ncards, duel\n**⌚️ • Récompenses**\nbuy, data.color, cshop\n**:key: • Job**\njob, braquage, kill, juge, cambriolage, hack, arrest, batiment, wagon\n**⚔️ • Team**\ntcreate, tedit, tbuy, ttop, tinvite, tinfos, tdep, twith, tleave, tkick, tpromote, tdemote\n:pill: • Illégal\nmobil, recolt\n**:small_orange_diamond: • Palier**\nxp\n**:beginner: • Administration**\n*WHITELIST:* add, remove, setgain, settime, setprice, setxp, setlogs, setmax, setleaderboard, start, drop, course\n*OWNER:* reset, mybot, wl, unwl, block, unblock, tdelete, command, guilds, update\n*ADMINISTRATEUR:* setprefix\n**:information_source: • Utilitaire**\nhelp, helpall, vocal, ping\n**✋ • Propriétaires**\nowner, unowner, setprofil, leave\n\n\n[\`Support du bot\`](https://discord.gg/zcN3sB5KSv) | [\`Lien pour m'ajouter\`](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot%20applications.commands) | [\`CoinsBot top.gg\`](https://discord.gg/zcN3sB5KSv)\n\n> Vous gagnez actuellement \`${gainvoc}\` toutes les 15 minutes\n> lorsque vous êtes en vocal, \`${gainstream}\` lorsque vous êtes en\n> stream et \`${gaincam}\` lorsque vous activez votre caméra !`)
    .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1129448364434526218/Untitled_Project.jpg?width=2476&height=1392`)
    .setTimestamp()
    .setColor(color)
    .setFooter({ text: `Coins Bot | By ruwinou & neiky.`, iconURL: `https://media.discordapp.net/attachments/1121718489829347358/1129449266960678964/1824_coin.png?width=1024&height=1024`})

    message.channel.send({ embeds: [embedHelp] })
    })
}