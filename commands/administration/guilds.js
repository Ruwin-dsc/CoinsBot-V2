const Discord = require("discord.js")

exports.help = {
    name: "guilds",
    category: "administration",
    aliases: ["serveurs"],
    description: "AAffiche les serveurs où est le bot",
    usage: "Pas d'utilisation conseillée",
    permission: "owner"
}

exports.run = async (bot, message, args, color) => {
    let content = ""

    const guilds = bot.guilds.cache.sort((a, b) => b.memberCount - a.memberCount);
    let num = 1

    guilds.forEach((guild, index) => {
        content += `**${num}** - ${guild.name} (${guild.id}) | Membres: ${guild.memberCount}\n\n`
        num = 1 + Number(num)
    });

    const buttondrop1 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji(`◀️`)
                .setCustomId("djdkdkdkkd")
                .setDisabled(true)
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji(`▶️`)
                .setCustomId("djdkdkdkddkodkkd")
                .setDisabled(true)
                .setStyle(Discord.ButtonStyle.Primary),
            )

    const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: `${bot.user.username}`, iconURL: bot.user.avatarURL()})
    .setDescription(`Total des serveurs - ${bot.guilds.cache.size}\n\n${content}`)
    .setFooter({ text: `Page - 1/1` })
    .setColor(color)

    message.reply({ embeds: [embed], components: [buttondrop1] })
}