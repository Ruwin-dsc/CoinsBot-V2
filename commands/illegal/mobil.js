const Discord = require("discord.js")

exports.help = {
    name: "mobil",
    category: "illegal",
    aliases: ["phone", "mobile", "blanchir"],
    description: "Permets de gérer des affaires... illégales",
    usage: "mobil"
}

const cooldownscontactes = new Map();
const cooldownTimecontactes = 5 * 60 * 60;

exports.run = async (bot, message, args, color) => {
    let pilluser, pillauthor;
    const embedTel = new Discord.EmbedBuilder()
    .setAuthor({ name: `Téléphone de ${message.author.username}`})
    .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1129472587211214929/unknown.png?width=656&height=1312`)
    .setColor(color)

    const MenuSelection = new Discord.StringSelectMenuBuilder()
            .setCustomId('MenuSelectionDrugs')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Ouvrir une application")
                .addOptions(
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Bourse")
                        .setValue("bourse")
                        .setEmoji(`💰`)
                        .setDescription(`Affiche le prix actuel de la 💊`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Drugs")
                        .setValue("drugs")
                        .setEmoji(`💊`)
                        .setDescription(`Affiche votre nombre de 💊`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Téléphone")
                        .setValue("telephone")
                        .setEmoji(`📱`)
                        .setDescription(`Permet de donner une 💊`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Contactes")
                        .setValue("contactes")
                        .setEmoji(`💸`)
                        .setDescription(`Permet de revendre tous ses 💊`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Twitter")
                        .setValue("twitter")
                        .setEmoji(`🐦`)
                        .setDescription(`Permet de devenir cultivateur`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Messages")
                        .setValue("message")
                        .setEmoji(`💬`)
                        .setDescription(`Permet de devenir blanchisseur`),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel("Reddit")
                        .setValue("reddit")
                        .setEmoji(`🤖`)
                        .setDescription(`Permet de perdre sa capacité`),
                )
    let filter2 = (m) => m.author.id === message.author.id

    const msg = await message.reply({ embeds: [embedTel], components: [new Discord.ActionRowBuilder().addComponents([MenuSelection])]})

    const collector = msg.createMessageComponentCollector({});
              
    collector.on('collect', async (interaction) => {
        if(interaction.customId == "MenuSelectionDrugs") {
            if(interaction.values[0] == "bourse") {
                if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true })
                interaction.reply({ content: `Le prix de la 💊 est actuellement de \`${bot.pill}\` coins !\n*Le prix change régulièrement*`, ephemeral: true })
        }
        
            if(interaction.values[0] == "drugs") {
                if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true })
                bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                interaction.reply({ content: `Vous avez actuellement \`${req[0].pill}\` 💊 !`, ephemeral: true })
                })
        }
        if(interaction.values[0] == "telephone") {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true })
                    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                        const pill = req[0].pill
                        if(pill == "0") return interaction.reply({ content: `:x: Vous n'avez pas assez de 💊`, ephemeral: true })

                            const msg = await interaction.reply({ content: `:eyes: Veuillez mentionner un membre à qui vous souhaitez envoyer \`1 💊\`:`, ephemeral: true })

                            let collected = await interaction.channel.awaitMessages({
                                filter: filter2,
                                max: 1,
                                errors: ["time"]
                            }).then(async (collected) => {
                                const msgg = collected.first()
                                const member = collected.first().mentions.members.first() 
                                
                                msgg.delete()
                                if(!member) return interaction.reply({ content: `:x: \`ERROR:\` Pas de membre trouvé !`, ephemeral: true })
                                bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${member.id}"`, async (err, req) => {
                                pilluser = Number(pill) - 1
                                pillauthor = Number(req[0].pill) + 1
                                bot.db.query(`UPDATE user SET pill = '${pilluser}' WHERE guildId = '${message.guild.id}' AND userId = '${member.id}'`)
                                bot.db.query(`UPDATE user SET pill = '${pillauthor}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                                interaction.reply({ content: `Vous venez de donner \`1 💊\` à ${member.user.username}`, ephemeral: true })
                                member.send(`${message.author.username} vous a envoyé \`1 💊\` sur \`${message.guild.name}\` !`)
                                })
                            })
        })
            }
            if(interaction.values[0] == "contactes") {
                if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true })
                if (cooldownscontactes.has(message.author.id + message.guild.id)) {
                    const cooldownExpiration = cooldownscontactes.get(message.author.id + message.guild.id) + cooldownTimecontactes;
                    const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

                    if (remainingCooldown > 0) {
                        const hours = Math.floor(remainingCooldown / 3600);
                        const minutes = Math.floor((remainingCooldown % 3600) / 60);
                        const seconds = Math.floor(remainingCooldown % 60);

                        const CouldownEmbed = new Discord.EmbedBuilder()
                        .setDescription(`:x: Vous avez déjà \`blanchisseur\` récemment\nRéessayez dans ${hours} heures, ${minutes} minutes et ${seconds} secondes`)
                        .setFooter(bot.footer)
                        .setColor(color)


                        return interaction.reply({ embeds: [CouldownEmbed], ephemeral: true });
                    }
                }
                bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                    const nohacker = new Discord.EmbedBuilder()
                    .setDescription(`:x: Vous devez avoir la capacité **blanchisseur** pour utiliser cette commande !`)
                    .setColor(color)
                    if(req[0].blanchisseur == "no") return interaction.reply({ embeds: [nohacker], ephemeral: true })

                    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                        const pill = req[0].pill
                        if(pill == "0") return interaction.reply({ content: `:x: Vous n'avez pas assez de 💊`, ephemeral: true })
                        if(bot.pill == undefined) return interaction.reply({ content: `:x: Si vous vendez maintenant, vous n'allez rien gagner car le bot vient de restart, réessayer dans 5 minutes !`, ephemeral: true })
                        const newpill = Number(pill) * Number(bot.pill)
                        bot.db.query(`UPDATE user SET coins = coins + ${newpill}, pill = '0' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                        cooldownscontactes.set(message.author.id + message.guild.id, Math.floor(Date.now() / 1000));

                        interaction.reply({ content: `Vous venez de vendre \`${pill} 💊\` pour \`${newpill}\``, ephemeral: true })

                    })
                })
            }

            if(interaction.values[0] == "twitter") {
                if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true })
                bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                    const nohacker = new Discord.EmbedBuilder()
                    .setDescription(`:x: Vous êtez déjà un cultivateur!`)
                    .setColor(color)
                    if(req[0].cultivateur == "yes") return interaction.reply({ embeds: [nohacker], ephemeral: true })
                    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {

                    const NotwitterEmbed = new Discord.EmbedBuilder()
                    .setDescription(`:x: Vous avez besoin de 8 réputations pour devenir un **cultivateur**`)
                    .setColor(color)

                    if(Number(req[0].reputation) < 8) return interaction.reply({ embeds: [NotwitterEmbed], ephemeral: true })

                    const reput = Number(req[0].reputation) - 8
                    bot.db.query(`UPDATE job SET cultivateur = 'yes', blanchisseur = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                    bot.db.query(`UPDATE user SET reputation = '${reput}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                    const twitterEmbed = new Discord.EmbedBuilder()
                    .setDescription(`:white_check_mark: Vous avez obtenu la capacité cultivateur pour \`8 rep\` et débloquez la commande \`recolt\` !`)
                    .setColor(color)

                    interaction.reply({ embeds: [twitterEmbed], ephemeral: true })

                    })                    
                })
            }

            if(interaction.values[0] == "message") {
                if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true })
                bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                    const nohacker = new Discord.EmbedBuilder()
                    .setDescription(`:x: Vous êtez déjà un blanchisseur !`)
                    .setColor(color)
                    if(req[0].blanchisseur == "yes") return interaction.reply({ embeds: [nohacker], ephemeral: true })
                    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {

                    const NotwitterEmbed = new Discord.EmbedBuilder()
                    .setDescription(`:x: Vous avez besoin de 15 réputations pour devenir un **blanchisseur**`)
                    .setColor(color)

                    if(Number(req[0].reputation) < 15) return interaction.reply({ embeds: [NotwitterEmbed], ephemeral: true })

                    const reput = Number(req[0].reputation) - 15
                    bot.db.query(`UPDATE job SET cultivateur = 'no', blanchisseur = 'yes' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                    bot.db.query(`UPDATE user SET reputation = '${reput}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                    const twitterEmbed = new Discord.EmbedBuilder()
                    .setDescription(`:white_check_mark: Vous avez obtenu la capacité \`blanchisseur\` pour \`15 rep\` et pouvez désormais convertir les :pill: en :coin: !`)
                    .setColor(color)

                    interaction.reply({ embeds: [twitterEmbed], ephemeral: true })

                    })                    
                })
            }

            if(interaction.values[0] == "reddit") {
                if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Vous n'avez pas la permission !`, ephemeral: true })
                bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
                    const nohacker = new Discord.EmbedBuilder()
                    .setDescription(`:x: Vous n'êtes pas un blanchisseur ou un cultivateur !`)
                    .setColor(color)
                    if(req[0].blanchisseur == "no" && req[0].cultivateur == "no") return interaction.reply({ embeds: [nohacker], ephemeral: true })

                    if(req[0].blanchisseur == "yes") {
                    
                    bot.db.query(`UPDATE job SET cultivateur = 'no', blanchisseur = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                    const twitterEmbed = new Discord.EmbedBuilder()
                    .setDescription(`:white_check_mark: Vous avez abandonné votre capacité **blanchisseur** !`)
                    .setColor(color)

                    interaction.reply({ embeds: [twitterEmbed], ephemeral: true })
                    } else if (req[0].cultivateur == "yes") {
                        bot.db.query(`UPDATE job SET cultivateur = 'no', blanchisseur = 'no' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

                    const twitterEmbed = new Discord.EmbedBuilder()
                    .setDescription(`:white_check_mark: Vous avez abandonné votre capacité **cultivateur** !`)
                    .setColor(color)

                    interaction.reply({ embeds: [twitterEmbed], ephemeral: true })
                    }
                })
            }
        
    }
    })


}