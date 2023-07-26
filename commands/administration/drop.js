const Discord = require("discord.js")

exports.help = {
    name: "drop",
    category: "administration",
    aliases: ["dropmoney"],
    description: "Envois de l'argent à un autre joueur",
    usage: "drop 100 <#channel / none>",
    permission: "whiteList"
}

exports.run = async (bot, message, args, color) => {
    let channel
    if(!args[0]) return message.channel.send(`:clipboard: Pas de récompense précisée | drop <amount> <#channel/none>`)
    if(isNaN(args[0])) return message.channel.send(`:clipboard: Pas de récompense précisée | drop <amount> <#channel/none>`)
    if(Number(args[0]) <= 0) return message.channel.send(":clipboard: Pas de récompense précisée | drop <amount> <#channel/none>")

    if(args[1]) {
        let i = args[1].replace("<#", "").split(">").join("")
        const a = bot.channels.cache.get(i) ? bot.channels.cache.get(i).name ? "yes" : "no" : "no"
        channel =  bot.channels.cache.get(i)
        if(a === "no") channel = message.channel
    } else channel = message.channel

    message.channel.send(`*Drop lancé dans ${channel}*`)
    const embed = new Discord.EmbedBuilder()
    .setTitle(`🎉 Un colis tombe du ciel !`)
    .setDescription(`Cliques sur le boutton ci-dessous pour l'attraper et gagner \`${args[0]} coins\``)
    .setFooter({ text: `Expire au bout de 60 secondes` })
    .setColor(color)
    
    const buttondrop0 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setLabel(`Lancement en cours...`)
                .setCustomId("sjsdjoj")
                .setDisabled(true)
                .setStyle(Discord.ButtonStyle.Primary),
            )

            const buttondrop1 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setLabel(`3`)
                .setCustomId("sjsdjojddd")
                .setDisabled(true)
                .setStyle(Discord.ButtonStyle.Primary),
            )
            const buttondrop2 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setLabel(`2`)
                .setCustomId("sjsdjojuuuuddd")
                .setDisabled(true)
                .setStyle(Discord.ButtonStyle.Primary),
            )
            const buttondropd = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setLabel(`1`)
                .setCustomId("dddddd")
                .setDisabled(true)
                .setStyle(Discord.ButtonStyle.Primary),
            )

            const buttondropdd = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setLabel(`Go !`)
                .setCustomId("dropgo")
                .setDisabled(false)
                .setEmoji(`🏆`)
                .setStyle(Discord.ButtonStyle.Primary),
            )

            const buttondropddd = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setLabel(`Go !`)
                .setCustomId("dropgo")
                .setDisabled(true)
                .setEmoji(`🏆`)
                .setStyle(Discord.ButtonStyle.Primary),
            )
    const msg = await channel.send({ embeds: [embed], components: [buttondrop0] })
    wait(2000).then(async () => {
        msg.edit({ embeds: [embed], components: [buttondrop1] })
        wait(1000).then(async () => {
            msg.edit({ embeds: [embed], components: [buttondrop2] })
            wait(1000).then(async () => {
            msg.edit({ embeds: [embed], components: [buttondropd] })
            wait(1000).then(async () => {
            msg.edit({ embeds: [embed], components: [buttondropdd] })
        })
        })
        })
    })

    const collector2 = msg.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, max: 1, time: 60000 });

        collector2.on('collect', (button) => {
            button.deferUpdate()
            if (button.customId === "dropgo") {
                bot.db.query(`UPDATE user SET coins = coins + ${args[0]} WHERE guildId = '${message.guild.id}' AND userId = '${button.user.id}'`)
                channel.send(`${button.user} a attrapé le colis ! Il vient de gagner \`${args[0]} coins\``)
            }
        })

        collector2.on('end', (collected) => {
            const embed = new Discord.EmbedBuilder()
            .setTitle(`Drop terminé`)
            .setColor(color)
            msg.edit({ embeds: [embed], components: [buttondropddd] })
        })
            

}

function wait(temps) {
  return new Promise(resolve => setTimeout(resolve, temps));
}
