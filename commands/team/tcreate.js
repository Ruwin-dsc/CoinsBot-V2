const Discord = require("discord.js")

exports.help = {
    name: "tcreate",
    category: "team",
    aliases: ["t-create"],
    description: "Pas de description renseignée.",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {
    let coinsfin;

    const pasassez = new Discord.EmbedBuilder()
    .setDescription(`:x: Vous avez besoin de 1000 pour créer une **team**`)
    .setColor(color)

    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        const userCoins = req[0].coins
        const haveteam = req[0].team

        if(userCoins < 1000) return message.channel.send({ embeds: [pasassez] })

        if(haveteam !== "no") return message.channel.send(`:x: Vous appartenez déjà à une team !`)

        coinsfin = Number(userCoins) - 1000

        let filter2 = (m) => m.author.id === message.author.id

        const msg = await message.channel.send(`:eyes: Veuillez entrer le **nom** de la team:\n(_Tapez \`cancel\` pour annuler l'action en cours_)`)

        let collected = await message.channel.awaitMessages({
                      filter: filter2,
                      max: 1,
                      time: 60000,
                    }).then(async (collected) => {
                      const msg = collected.first().content;
                      if(msg == "cancel") return message.channel.send(`:x: Action annulée`)

                      if(msg.length > 25) return message.channel.send(`:x: Le nom peut contenir 25 caractères maximum: action annulée`)

                      message.channel.send(`:eyes: Veuillez entrer la **description** de la team:\n(_Tapez \`cancel\` pour annuler l'action en cours_)`)

                    let collected2 = await message.channel.awaitMessages({
                                filter: filter2,
                                max: 1,
                                time: 60000,
                                }).then(async (collected2) => {
                                    const msg2 = collected.first().content;
                                    if(msg2 == "cancel") return message.channel.send(`:x: Action annulée`)

                                    if(msg2.length > 100) return message.channel.send(`:x: La description peut contenir 100 caractères maximum: action annulée`)

                                    bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}"`, async (err, req) => {

                                    const teamEmbed = new Discord.EmbedBuilder()
                                    .setTitle(`Team créée !`)
                                    .setDescription(`Nom: ${msg}\nID: ${req.length}\nDescription: ${msg2}\nLeader: ${message.author}\nDate de création: <t:${Math.floor(Date.now() / 1000)}:f>`)
                                    .setColor(color)
                                    
                                    bot.db.query(`INSERT INTO team (guildId, ownerId, id, nom, description, date) VALUES ("${message.guild.id}", "${message.author.id}", "${req.length}", "${msg}", "${msg2}", "${Date.now()}")`)
                                    bot.db.query(`INSERT INTO tmembers (guildId, teamId, userId, grade) VALUES ("${message.guild.id}", "${req.length}", "${message.author.id}", "Créateur")`)
                                    bot.db.query(`UPDATE user SET team = '${req.length}', coins = '${coinsfin}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                                    message.reply({embeds: [teamEmbed]})
                                    })

                                })

                    })


    })
}
