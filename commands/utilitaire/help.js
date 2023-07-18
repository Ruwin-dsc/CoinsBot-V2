const Discord = require("discord.js")

exports.help = {
    name: "help",
    category: "gestioncoins",
    aliases: ["aide"],
    description: "Affiche les commandes du bot",
    usage: "Pas d'utilisation conseillée"
}

exports.run = async (bot, message, args, color) => {

    const prefix = bot.prefix

    if(args[0]) {
        let cmdname = args[0]
        if(bot.commands.get(cmdname)){
         const cmdad = bot.commands.get(cmdname)
        if(cmdad) {
        let aliases = cmdad.help.aliases.join(', ')
        if(!aliases) aliases = "Aucun"

         const embedArgs = new Discord.EmbedBuilder()
         .setAuthor({ name: `Page d'aide de la commande ${cmdname}`, iconURL: `https://media.discordapp.net/attachments/851876715835293736/852647593020620877/746614051601252373.png`, url: 'https://discord.gg/zcN3sB5KSv' })
         .setDescription(`**Commande -** [ \`${args[0]}\` ]\n\n**Description -** [ \`${cmdad.help.description}\` ]\n\n**Usage -** [ \`${cmdad.help.usage}\` ]\n\n**Aliases -** [ \`${aliases}\` ]`)
         .setFooter({ text: `Coins Bot | By ruwinou & neiky.`, iconURL: `https://media.discordapp.net/attachments/1121718489829347358/1123516884550168576/a_f6e022c4f28191fc0ca035b262cc5c4e_copie.jpg?width=562&height=562`})
         .setColor(color)

         message.reply({ embeds: [embedArgs] })
        } else {
            message.channel.send(`:x: Commande innexistante !`)
        }

        }

    } else {
bot.db.query(`SELECT * FROM gain WHERE guildId = ${message.guild.id}`, async (err, req) => {
    let gainvoc, gaincam, gainstream
    gainvoc = req[0].vocal
    if(gainvoc == "0") gainvoc = "rien coins"
    gainstream = req[0].stream
    if(gainstream == "0") gainstream = "rien coins"
    gaincam = req[0].cam
    if(gaincam == "0") gaincam = "rien coins"
    

    const page1 = new Discord.EmbedBuilder()
    .setTitle(`👤 • Serveur Informations`)
    .setDescription(`Utilise \`${prefix}help [commande]\` pour obtenir des informations sur une commande\n\n> 🔊 Vous gagnez \`${gainvoc}\` toutes les 15 minutes lorsque vous êtes en vocal\n> 🎥 Vous gagnez \`${gainstream}\` lorsque vous êtes en stream\n> 📹 Et vous gagnez \`${gaincam}\` lorsque vous activez votre caméra !\n\n[\`Support du bot\`](https://discord.gg/zcN3sB5KSv) | [\`Lien pour m'ajouter\`](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot%20applications.commands) | [\`Vote pour CoinsBot\`](https://discord.gg/zcN3sB5KSv)\n\n*Appuyez sur les flèches ci-dessous pour changer de page !*`)
    .setColor(color)
    .setFooter({ text: `Page 1/13 | By ruwinou & neiky.`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
    const page2 = new Discord.EmbedBuilder()
    .setTitle(`🪙 • Gestion des coins`)
    .setDescription(`Utilisez \`${prefix}help [commande]\` pour obtenir des informations sur une commande\n\n\`${prefix}coins\`\n\`${prefix}profil\`\n\`${prefix}top\`\n\`${prefix}pay\`\n\`${prefix}with\`\n\`${prefix}dep\`\n\`${prefix}rep\``)
    .setColor(color)
    .setFooter({ text: `Page 2/13 | By ruwinou & neiky.`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
    const page3 = new Discord.EmbedBuilder()
    .setTitle(`🎲 • Jeux`)
    .setDescription(`Utilisez \`${prefix}help [commande]\` pour obtenir des informations sur une commande\n\n\`${prefix}work\`\n\`${prefix}daily\`\n\`${prefix}slut\`\n\`${prefix}gift\`\n\`${prefix}mine\`\n\`${prefix}rob\``)
    .setColor(color)
    .setFooter({ text: `Page 3/13 | By ruwinou & neiky.`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
    const page4 = new Discord.EmbedBuilder()
    .setTitle(`:rocket: • Mini-jeux`)
    .setDescription(`Utilisez \`${prefix}help [commande]\` pour obtenir des informations sur une commande\n\n\`${prefix}gunfight\`\n\`${prefix}pfc\`\n\`${prefix}power4\`\n\`${prefix}roulette\`\n\`${prefix}blackjack\``)
    .setColor(color)
    .setFooter({ text: `Page 4/13 | By ruwinou & neiky.`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
    const page5 = new Discord.EmbedBuilder()
    .setTitle(`:black_joker: • Cartes`)
    .setDescription(`Utilisez \`${prefix}help [commande]\` pour obtenir des informations sur une commande\n\n\`${prefix}mycard\`\n\`${prefix}duel\``)
    .setColor(color)
    .setFooter({ text: `Page 5/13 | By ruwinou & neiky.`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
    const page6 = new Discord.EmbedBuilder()
    .setTitle(`⌚️ • Récompenses`)
    .setDescription(`Utilisez \`${prefix}help [commande]\` pour obtenir des informations sur une commande\n\n\`${prefix}buy\`\n\`${prefix}color\`\n\`${prefix}cshop\``)
    .setColor(color)
    .setFooter({ text: `Page 6/13 | By ruwinou & neiky.`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
    const page7 = new Discord.EmbedBuilder()
    .setTitle(`:key: • Job`)
    .setDescription(`Utilisez \`${prefix}help [commande]\` pour obtenir des informations sur une commande\n\n\`${prefix}job\`\n\`${prefix}braquage\`\n\`${prefix}kill\`\n\`${prefix}juge\`\n\`${prefix}cambriolage\`\n\`${prefix}hack\`\n\`${prefix}arrest\`\n\`${prefix}batiment\`\n\`${prefix}wagon\``)
    .setColor(color)
    .setFooter({ text: `Page 7/13 | By ruwinou & neiky.`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
    const page8 = new Discord.EmbedBuilder()
    .setTitle(`:crossed_swords: • Team`)
    .setDescription(`Utilisez \`${prefix}help [commande]\` pour obtenir des informations sur une commande\n\n\`${prefix}tcreate\`\n\`${prefix}tedit\`\n\`${prefix}tbuy\`\n\`${prefix}ttop\`\n\`${prefix}tinvite\`\n\`${prefix}tinfos\`\n\`${prefix}tinvite\`\n\`${prefix}tdep\`\n\`${prefix}twith\`\n\`${prefix}tleave\`\n\`${prefix}tkick\`\n\`${prefix}tpromote\`\n\`${prefix}tdemote\``)
    .setColor(color)
    .setFooter({ text: `Page 8/13 | By ruwinou & neiky.`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
    const page9 = new Discord.EmbedBuilder()
    .setTitle(`:pill: • Illégal`)
    .setDescription(`Utilisez \`${prefix}help [commande]\` pour obtenir des informations sur une commande\n\n\`${prefix}mobil\`\n\`${prefix}recolt\``)
    .setColor(color)
    .setFooter({ text: `Page 9/13 | By ruwinou & neiky.`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
    const page10 = new Discord.EmbedBuilder()
    .setTitle(`:small_orange_diamond: • Palier`)
    .setDescription(`Utilisez \`${prefix}help [commande]\` pour obtenir des informations sur une commande\n\n`)
    .setColor(color)
    .setFooter({ text: `Page 10/13 | By ruwinou & neiky.`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
    const page11 = new Discord.EmbedBuilder()
    .setTitle(`:beginner: • Administration`)
    .setDescription(`Utilisez \`${prefix}help [commande]\` pour obtenir des informations sur une commande\n\n*WHITELIST:*\n\`${prefix}add\`\n\`${prefix}remove\`\n\`${prefix}setgain\`\n\`${prefix}setgain\`\n\`${prefix}setxp\`\n\`${prefix}setlogs\`\n\`${prefix}setleaderboard\`\n\`${prefix}start\`\n\`${prefix}drop\`\n\`${prefix}start\`\n\`${prefix}course\`\n\n*OWNERS:*\n\`${prefix}reset\`\n\`${prefix}mybot\`\n\`${prefix}wl\`\n\`${prefix}unwl\`\n\`${prefix}block\`\n\`${prefix}unblock\`\n\`${prefix}tdelete\`\n\`${prefix}command\`\n\`${prefix}guilds\`\n\n*ADMINISTRATEUR:*\n\`${prefix}setprefix\``) 
    .setColor(color)
    .setFooter({ text: `Page 11/13 | By ruwinou & neiky.`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
    const page12 = new Discord.EmbedBuilder()
    .setTitle(`:information_source: • Utilitaire`)
    .setDescription(`Utilisez \`${prefix}help [commande]\` pour obtenir des informations sur une commande\n\n\`${prefix}help\`\n\`${prefix}helpall\`\n\`${prefix}vocal\`\n\`${prefix}ping\``)
    .setColor(color)
    .setFooter({ text: `Page 12/13 | By ruwinou & neiky.`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
    const page13 = new Discord.EmbedBuilder()
    .setTitle(`✋ • Propriétaires`)
    .setDescription(`Utilisez \`${prefix}help [commande]\` pour obtenir des informations sur une commande\n\n\`${prefix}owner\`\n\`${prefix}unowner\`\n\`${prefix}setprofil\`\n\`${prefix}leave\`\n`)
    .setColor(color)
    .setFooter({ text: `Page 13/13 | By ruwinou & neiky.`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

    

    const botton = new Discord.ActionRowBuilder() //page 1
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji("◀️")
                .setCustomId("13help2")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("▶️")
                .setCustomId("2help")
                .setStyle(Discord.ButtonStyle.Primary)
            )
    const botton2 = new Discord.ActionRowBuilder() //page 2
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji("◀️")
                .setCustomId("1help")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("▶️")
                .setCustomId("3help")
                .setStyle(Discord.ButtonStyle.Primary)
            )
    const botton3 = new Discord.ActionRowBuilder() //page 3
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji("◀️")
                .setCustomId("2help2")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("▶️")
                .setCustomId("4help")
                .setStyle(Discord.ButtonStyle.Primary)
            )
    const botton4 = new Discord.ActionRowBuilder() //page 4
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji("◀️")
                .setCustomId("3help2")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("▶️")
                .setCustomId("5help")
                .setStyle(Discord.ButtonStyle.Primary)
            )
    const botton5 = new Discord.ActionRowBuilder() //page 5
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji("◀️")
                .setCustomId("4help2")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("▶️")
                .setCustomId("6help")
                .setStyle(Discord.ButtonStyle.Primary)
            )
    const botton6 = new Discord.ActionRowBuilder() //page 6
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji("◀️")
                .setCustomId("5help2")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("▶️")
                .setCustomId("7help")
                .setStyle(Discord.ButtonStyle.Primary)
            )
    const botton7 = new Discord.ActionRowBuilder() //page 7
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji("◀️")
                .setCustomId("6help2")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("▶️")
                .setCustomId("8help")
                .setStyle(Discord.ButtonStyle.Primary)
            )
    const botton8 = new Discord.ActionRowBuilder() //page 8
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji("◀️")
                .setCustomId("7help2")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("▶️")
                .setCustomId("9help")
                .setStyle(Discord.ButtonStyle.Primary) 
            )
    const botton9 = new Discord.ActionRowBuilder() //page 9
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji("◀️")
                .setCustomId("8help2")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("▶️")
                .setCustomId("10help")
                .setStyle(Discord.ButtonStyle.Primary)  
            )
    const botton10 = new Discord.ActionRowBuilder() //page 10
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji("◀️")
                .setCustomId("9help2")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("▶️")
                .setCustomId("11help")
                .setStyle(Discord.ButtonStyle.Primary)  
            )
    const botton11 = new Discord.ActionRowBuilder() //page 11
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji("◀️")
                .setCustomId("10help2")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("▶️")
                .setCustomId("12help")
                .setStyle(Discord.ButtonStyle.Primary)             
            )
    const botton12 = new Discord.ActionRowBuilder() //page 12
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji("◀️")
                .setCustomId("11help2")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("▶️")
                .setCustomId("13help")
                .setStyle(Discord.ButtonStyle.Primary)
            )
    const botton13 = new Discord.ActionRowBuilder() //page 13
            .addComponents(
                new Discord.ButtonBuilder()
                .setEmoji("◀️")
                .setCustomId("12help2")
                .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                .setEmoji("▶️")
                .setCustomId("1help2")
                .setStyle(Discord.ButtonStyle.Primary)
            )

    const msg = await message.reply({ embeds: [page1], components: [botton] })
    const collector = msg.createMessageComponentCollector({
    });

    collector.on('collect', async (interaction) => {
                interaction.deferUpdate()

                if (interaction.customId === '1help' || interaction.customId === '1help2') {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})
                    msg.edit({ embeds: [page1], components: [botton] })
                }
                if (interaction.customId === '2help' || interaction.customId === '2help2') {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})
                    msg.edit({ embeds: [page2], components: [botton2] })
                }
                if (interaction.customId === '3help' || interaction.customId === '3help2') {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})
                    msg.edit({ embeds: [page3], components: [botton3] })
                }
                if (interaction.customId === '4help' || interaction.customId === '4help2') {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})
                    msg.edit({ embeds: [page4], components: [botton4] })
                }
                if (interaction.customId === '5help' || interaction.customId === '5help2') {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})
                    msg.edit({ embeds: [page5], components: [botton5] })
                }
                if (interaction.customId === '6help' || interaction.customId === '6help2') {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})
                    msg.edit({ embeds: [page6], components: [botton6] })
                }
                if (interaction.customId === '7help' || interaction.customId === '7help2') {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})
                    msg.edit({ embeds: [page7], components: [botton7] })
                }
                if (interaction.customId === '8help' || interaction.customId === '8help2') {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})
                    msg.edit({ embeds: [page8], components: [botton8] })
                }
                if (interaction.customId === '9help' || interaction.customId === '9help2') {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})
                    msg.edit({ embeds: [page9], components: [botton9] })
                }
                if (interaction.customId === '10help' || interaction.customId === '10help2') {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})
                    msg.edit({ embeds: [page10], components: [botton10] })
                }
                if (interaction.customId === '11help' || interaction.customId === '11help2') {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})
                    msg.edit({ embeds: [page11], components: [botton11] })
                }
                if (interaction.customId === '12help' || interaction.customId === '12help2') {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})
                    msg.edit({ embeds: [page12], components: [botton12] })
                }
                if (interaction.customId === '13help' || interaction.customId === '13help2') {
                    if(interaction.user.id !== message.author.id) return interaction.reply({ content: `Désolé, mais vous n'avez pas la permission d'utiliser ces boutons !`, ephemeral: true})
                    msg.edit({ embeds: [page13], components: [botton13] })
                }


            })


        })

        }
}