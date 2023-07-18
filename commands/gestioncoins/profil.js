const Discord = require("discord.js")

exports.help = {
    name: "profil",
    category: "gestioncoins",
    aliases: ["profile", "inv", "inventaire"],
    description: "Affiche les informations d'un utilisateur",
    usage: "Pas d'utilisation conseillée"
}

const cooldownTime2 = 2 * 60 * 60;

exports.run = async (bot, message, args, color) => {
    let bar;
    let garage;
    let magasin;
    let cinema;
    let gare;
    let mairie;
    let entrepot;
    let antirob;
    let job = "Chômeur";
    let teamid, teamname;

    const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`, async (err, req) => {
        teamid = req[0].team
        if(teamid == 'no') teamid = "Aucune"
        bot.db.query(`SELECT * FROM team WHERE guildId = "${message.guild.id}" AND id = "${teamid}"`, async (err, req) => {
            if(req.length < 1) {
                teamname = "Aucune team"
            } else {
                teamname = req[0].nom
            }
            
        })
    })

    if (bot.antirob.has(mention.id + message.guild.id)) {
        const cooldownExpiration = bot.antirob.get(mention.id + message.guild.id) + cooldownTime2;
        const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

        if (remainingCooldown > 0) {
            const hours = Math.floor(remainingCooldown / 3600);
            const minutes = Math.floor((remainingCooldown % 3600) / 60);
            const seconds = Math.floor(remainingCooldown % 60);

            antirob = `${hours} heure(s), ${minutes} minute(s) et ${seconds} seconde(s)`
        }
    } else antirob = `Non actif`

    bot.db.query(`SELECT * FROM batiment WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`, async (err, req) => {
        if(req[0].bar == "no") bar = "Non possédé"
        if(req[0].bar == "yes") bar = "Possédé"
        if(req[0].garage == "no") garage = "Non possédé"
        if(req[0].garage == "yes") garage = "Possédé"
        if(req[0].magasin == "no") magasin = "Non possédé"
        if(req[0].magasin == "yes") magasin = "Possédé"
        if(req[0].cinema == "no") cinema = "Non possédé"
        if(req[0].cinema == "yes") cinema = "Possédé"
        if(req[0].gare == "no") gare = "Non possédé"
        if(req[0].gare == "yes") gare = "Possédé"
        if(req[0].mairie == "no") mairie = "Non possédé"
        if(req[0].mairie == "yes") mairie = "Possédé"
        entrepot = req[0].entrepot

        bot.db.query(`SELECT * FROM job WHERE guildId = "${message.guild.id}" AND userId = "${mention.id}"`, async (err, req) => {
            for (const columnName in req[0]) {
                if (columnName !== "cultivateur" && columnName !== "blanchisseur" && req[0][columnName] === "yes") {
                job = columnName;
                break;
                }
            }

        const coinsEmbed = new Discord.EmbedBuilder()
        .setAuthor({ name: mention.user.username, iconURL: mention.user.displayAvatarURL({ dynamic: true }), url: 'https://discord.gg/zcN3sB5KSv' })
        .setDescription(`**Bar:** ${bar}\n**Garage:** ${garage}\n**Magasin:** ${magasin}\n**Cinema:** ${cinema}\n**Gare:** ${gare}\n**Mairie:** ${mairie}\n**Entrepôt:** \`${entrepot}/5000 coins\`\n\n**Anti-rob**: ${antirob}\n**Métier**: ${job}\n**Couleur des embed**: ${color}\n**Team**: ${teamname} (id: ${teamid})`)
        .setColor(color)

        message.reply({ embeds: [coinsEmbed] })
        })
        
    })
}