const Discord = require("discord.js")

const cooldownTime = 1 * 60 * 60;

const cooldownsgift = new Map();

exports.help = {
    name: "gift",
    category: "jeux",
    aliases: ["gft"],
    description: "Génère trois cartes, choisissez la bonne !",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {

    let winlost;
    let coinsUser;
    let embedColor;

    const minmoney = -400
    const maxmoney = 500

    const money1 = Math.floor(Math.random() * (parseInt(maxmoney) - parseInt(minmoney) + 1)) + parseInt(minmoney)
    const money2 = Math.floor(Math.random() * (parseInt(maxmoney) - parseInt(minmoney) + 1)) + parseInt(minmoney)
    const money3 = Math.floor(Math.random() * (parseInt(maxmoney) - parseInt(minmoney) + 1)) + parseInt(minmoney)

    if (cooldownsgift.has(message.author.id + message.guild.id)) {
                    const cooldownExpiration = cooldownsgift.get(message.author.id + message.guild.id) + cooldownTime;
                    const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

                    if (remainingCooldown > 0) {
                        const hours = Math.floor(remainingCooldown / 3600);
                        const minutes = Math.floor((remainingCooldown % 3600) / 60);
                        const seconds = Math.floor(remainingCooldown % 60);

                        const CouldownEmbed = new Discord.EmbedBuilder()
                        .setDescription(`:x: Vous avez déjà gift récemment\n\nRéessayez dans ${hours} heures, ${minutes} minutes et ${seconds} secondes`)
                        .setFooter(bot.footer)
                        .setColor(color)


                        return message.reply({ embeds: [CouldownEmbed] });
                    }
                }


    const embedSlut = new Discord.EmbedBuilder()
    .setTitle(`Trois cartes sont à votre disposition...`)
    .setDescription(`Choisissez une des cartes ci-dessous !\nEt tentez de gagner entre \`-400 coins\` et \`500 coins\` !\n:warning: Elles expirent dans <t:${Math.floor((Date.now() + 60000) / 1000)}:R>`)
    .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1126154342081245275/coinsbot_gift.png?width=900&height=600`)
    .setFooter(bot.footer)

     const bottoncounter = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji("1️⃣")
                .setCustomId("oneslut")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("2️⃣")
                .setCustomId("twoslut")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("3️⃣")
                .setCustomId("threeslut")
                .setStyle(Discord.ButtonStyle.Primary),
            )
            
        const msg = await message.reply({ embeds: [embedSlut], components: [bottoncounter]})

    const collector = msg.createMessageComponentCollector({
        time: 60000,
    });

    collector.on('collect', async (interaction) => {
                interaction.deferUpdate()


                if (interaction.customId === 'oneslut') {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})

                    if(money1 < 0) winlost = "perdre"
                    if(money1 >= 0) winlost = "gagné"
                    if(money1 < 0) embedColor = "Red"
                    if(money1 >= 0) embedColor = "Green"

                        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {

                            coinsUser = Number(money1) + Number(req[0].coins)

                            bot.db.query(`UPDATE user SET coins = '${coinsUser}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                        })  


                    const EmbedDIscord = new Discord.EmbedBuilder()
                    .setTitle(`:gift: Vous venez de ${winlost} \`${money1} coins\` !`)
                    .addFields(
                        { name: `Carte 1\n`, value: `\`${money1}\`\n`, inline: false },
                        { name: `Carte 2\n`, value: `\`${money2}\`\n`, inline: false },
                        { name: `Carte 3\n`, value: `\`${money3}\``, inline: false },
                        )
                    .setColor(embedColor)
                    cooldownsgift.set(message.author.id, Math.floor(Date.now() / 1000));
                    msg.edit({ embeds: [EmbedDIscord], components: [] })
                }

                if (interaction.customId === 'twoslut') {
                     if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})

                    if(money2 < 0) winlost = "perdre"
                    if(money2 >= 0) winlost = "gagné"
                    if(money2 < 0) embedColor = "Red"
                    if(money2 >= 0) embedColor = "Green"

                        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {

                            coinsUser = Number(money2) + Number(req[0].coins)

                            bot.db.query(`UPDATE user SET coins = '${coinsUser}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                        })  


                    const EmbedDIscord = new Discord.EmbedBuilder()
                    .setTitle(`:gift: Vous venez de ${winlost} \`${money2} coins\` !`)
                    .addFields(
                        { name: `Carte 1\n`, value: `\`${money1}\`\n`, inline: false },
                        { name: `Carte 2\n`, value: `\`${money2}\`\n`, inline: false },
                        { name: `Carte 3\n`, value: `\`${money3}\``, inline: false },
                        )
                    .setColor(embedColor)
                    cooldownsgift.set(message.author.id, Math.floor(Date.now() / 1000));
                    msg.edit({ embeds: [EmbedDIscord], components: [] })
                }

                if (interaction.customId === 'threeslut') {
                     if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})

                    if(money3 < 0) winlost = "perdu"
                    if(money3 >= 0) winlost = "gagné"
                    if(money3 < 0) embedColor = "Red"
                    if(money3 >= 0) embedColor = "Green"

                        bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {

                            coinsUser = Number(money3) + Number(req[0].coins)

                            bot.db.query(`UPDATE user SET coins = '${coinsUser}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                        })  


                    const EmbedDIscord = new Discord.EmbedBuilder()
                    .setTitle(`:gift: Vous venez de ${winlost} \`${money3} coins\` !`)
                    .addFields(
                        { name: `Carte 1\n`, value: `\`${money1}\`\n`, inline: false },
                        { name: `Carte 2\n`, value: `\`${money2}\`\n`, inline: false },
                        { name: `Carte 3\n`, value: `\`${money3}\``, inline: false },
                        )
                    .setColor(embedColor)
                    cooldownsgift.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));
                    msg.edit({ embeds: [EmbedDIscord], components: [] })
                }

                })

}