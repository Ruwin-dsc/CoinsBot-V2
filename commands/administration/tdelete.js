const Discord = require("discord.js")

exports.help = {
    name: "tdelete",
    category: "administration",
    aliases: [],
    description: "Supprime une team",
    usage: "Pas d'utilisation conseillée",
    permission: "owner"
}

exports.run = async (bot, message, args, color) => {    
    if(!args[0]) return message.reply(`:x: Merci d'indiquer l'identifiant de team a supprimé !`)
    bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${args[0]}"`, async (err, req) => {
        if(req.length < 1) return message.reply(`:x: Identifiant invalide`)
        const name = req[0].nom
        bot.db.query(`SELECT * FROM tmembers WHERE guildId = "${message.guild.id}" AND teamId = "${args[0]}"`, async (err, req) => {
            const accept = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji(`✅`)
                .setLabel(`Oui je veux supprimer la team`)
                .setCustomId("checkteamtodelete")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji(`❌`)
                .setLabel(`Non je ne veux pas supprimer la team`)
                .setCustomId("noteamtodelete")
                .setStyle(Discord.ButtonStyle.Primary),
            )
        const msg = await message.channel.send({ content: `:question: Êtes-vous sûr de vouloir supprimer la team ${name} (${name}) ?\n👤 Elle contient ${req.length} membres`, components: [accept]})

        accept.components.forEach((button) => {
          button.setDisabled(true);
        });

        const collector = msg.createMessageComponentCollector({});
        let filter2 = (m) => m.author.id === message.author.id
              
    collector.on('collect', async (interaction) => {
        if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Tu n'as pas la permission d'utiliser ces boutons !`, ephemeral: true})
        interaction.deferUpdate()
        if(interaction.customId == "checkteamtodelete") {
            bot.db.query(`DELETE FROM team WHERE guildId = ${message.guild.id} AND id = ${args[0]}`);
            bot.db.query(`DELETE FROM tmembers WHERE guildId = ${message.guild.id} AND teamId = ${args[0]}`);
            bot.db.query('UPDATE user SET team = ? WHERE guildId = ? AND team = ?', ["no", message.guild.id, args[0]])

            message.channel.send(`:white_check_mark: La team ${name} a bien été supprimée et ses membres retirés !`)
        }

        if(interaction.customId == "noteamtodelete") {

            message.channel.send(`:x: Action annulée !`)

        }
    })


        })
    })

}
