const Discord = require("discord.js");

function wait(temps) {
    return new Promise(resolve => setTimeout(resolve, temps));
}

exports.help = {
    name: "roulette",
    category: "minijeux",
    aliases: ["roll"],
    description: "Joue à la roulette avec les couleurs r, b, g ou un nombre spécifique",
    usage: "roulette <mise> <couleur/numéro>"
}

const gameInProgress = new Map();

exports.run = async (bot, message, args, color) => {
    let userCoins, mise;

    const noargs0 = new Discord.EmbedBuilder()
        .setDescription(":x: Précisez un montant à miser | roulette <amount/all> <color/number>");
    if (!args[0]) return message.channel.send({ embeds: [noargs0] });
    mise = args[0];
    if (isNaN(mise) && mise !== "all") return message.reply(":x: Ceci n'est pas un chiffre valide !");
    if (mise < 50) return message.reply(":x: Vous devez miser un chiffre supérieur à 50 !");
    const couleurOuNumero = args[1].toLowerCase();

    let type;
    let valeur;
    if (["r", "red", "b", "black", "g", "green"].includes(couleurOuNumero)) {
        type = "couleur";
        valeur = couleurOuNumero;
    } else if (!isNaN(couleurOuNumero)) {
        type = "numéro";
        valeur = parseInt(couleurOuNumero);
        if (valeur < 0 || valeur > 37) {
            const nonumber = new Discord.EmbedBuilder()
                .setDescription(":x: Le chiffre doit être compris entre **0** et **37**");
            return message.reply({ embeds: [nonumber] });
        }
    } else {
        const noargs1 = new Discord.EmbedBuilder()
            .setDescription(":x: Précisez une couleur | Red [1.5x] Black [2x] Green [12x] **ou** un chiffre");

        return message.reply({ embeds: [noargs1] });
    }

    bot.db.query(`SELECT * FROM user WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`, async (err, req) => {
        if (req.length < 1) return message.reply(':x: Vous n\'avez pas encore commencé, refaites la commande !');

        userCoins = req[0].coins;

        const pasassez = new Discord.EmbedBuilder()
            .setDescription(":x: Vous n'avez pas assez !");
            if (args[0] == "all") mise = Number(userCoins)

        if (Number(userCoins) < mise) return message.channel.send({ embeds: [pasassez] });


        if (gameInProgress.has(message.author.id + message.channel.id)) {
        return message.reply(":x: Vous avez déjà lancé une roulette ! Veuillez attendre la fin de celle-ci !");
    }
    gameInProgress.set(message.author.id + message.channel.id, true);

        let gains;
        let winMessage;
        if (type === "couleur") {
            if (valeur === "r" || valeur === "red") {
                gains = mise * 1.5;
                winMessage = "Vous avez misé sur la couleur rouge et vous avez gagné !";
            } else if (valeur === "b" || valeur === "black") {
                gains = mise * 2;
                winMessage = "Vous avez misé sur la couleur noire et vous avez gagné !";
            } else if (valeur === "g" || valeur === "green") {
                gains = mise * 12;
                winMessage = "Vous avez misé sur la couleur verte et vous avez gagné !";
            }
        } else if (type === "numéro") {
            if (valeur >= 0 && valeur <= 36) {
                gains = mise * 12;
                winMessage = `Vous avez misé sur le numéro ${valeur} et vous avez gagné !`;
            } else if (valeur === 37) {
                gains = mise * 4;
                winMessage = "Vous avez misé sur le numéro 00 et vous avez gagné !";
            } else {
                const nonumber = new Discord.EmbedBuilder()
                    .setDescription(":x: Le chiffre doit être compris entre **0** et **37**");
                return message.reply({ embeds: [nonumber] });
            }
        }
        
        let time; 
        if(type === "couleur") time = "10"
        if(type === "numéro") time = "20"
        
        const waitEmbed = new Discord.EmbedBuilder()
            .setDescription(`${message.author.username} vient de lancer une roulette en misant \`${mise}\` coins sur \`${args[1]}\` !`)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1127166574772617286/LivelyObviousAnhinga-size_restricted_2.gif?width=870&height=500`)
            .setFooter({ text: `${time} secondes avant le résultat`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
        const waitMessage = await message.channel.send({ embeds: [waitEmbed] });

        let result;

        if (type === "couleur") {
            await wait(10000);

            result = Math.floor(Math.random() * 38);
        } else if (type === "numéro") {
            await wait(20000);

            result = Math.floor(Math.random() * 38);
        }

        let win = false;
        let winNumber;
        if (type === "couleur") {
            if (
                (valeur === "r" || valeur === "red") && (result === 1 || result === 3 || result === 5 || result === 7 || result === 9 || result === 12 || result === 14 || result === 16 || result === 18 || result === 19 || result === 21 || result === 23 || result === 25 || result === 27 || result === 30 || result === 32 || result === 34 || result === 36)
            ) {
                win = true;
            } else if (
                (valeur === "b" || valeur === "black") && (result === 2 || result === 4 || result === 6 || result === 8 || result === 10 || result === 11 || result === 13 || result === 15 || result === 17 || result === 20 || result === 22 || result === 24 || result === 26 || result === 28 || result === 29 || result === 31 || result === 33 || result === 35)
            ) {
                win = true;
            } else if (
                (valeur === "g" || valeur === "green") && result === 0
            ) {
                win = true;
            }
        } else if (type === "numéro") {
            if (valeur === result) {
                winNumber = true;
            }
        }

        if (win && type === "couleur") {
            const winEmbed = new Discord.EmbedBuilder()
            .setTitle(`Résultat: ${valeur === "r" || valeur === "red" ? "Red" : (valeur === "b" || valeur === "black" ? "Black" : "Green")}`)
            .setDescription(`${valeur === "r" || valeur === "red" ? ":red_circle:" : (valeur === "b" || valeur === "black" ? ":black_circle:" : ":green_circle:")} Vous avez gagné \`${gains} coins\`\n\nMultiplicateur: ${valeur === "r" || valeur === "red" ? "1.5x" : (valeur === "b" || valeur === "black" ? "2x" : "12x")}`)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setColor(color)

                bot.db.query(`UPDATE user SET coins = coins + ${gains} WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`);
            message.reply({ content: `<@${message.author.id}>`, embeds: [winEmbed] });
        } else if (!win && type === "couleur") {
            const loseEmbed = new Discord.EmbedBuilder()
                .setDescription(`:x: Vous avez perdu \`${mise} coins\`\n\nMultiplieur: 0x`)
                .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                .setColor(color)

                bot.db.query(`UPDATE user SET coins = coins - ${mise} WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`);

            message.channel.send({ content: `<@${message.author.id}>`, embeds: [loseEmbed] });
        } else if (!win && type === "numéro") {
            const winEmbed = new Discord.EmbedBuilder()
            .setTitle(`Résultat: ${result}`)
            .setColor(color)
            .setDescription(`:name_badge: Vous avez misez sur le mauvais numéro !\nVous venez de perdre \`${mise} coins\``)

                bot.db.query(`UPDATE user SET coins = coins - ${mise} WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`);
            message.reply({ embeds: [winEmbed] });
        } else if (win && type === "numéro") {
            const winEmbed = new Discord.EmbedBuilder()
            .setTitle(`Résultat: ${result}`)
            .setColor(color)
            .setDescription(`:tada: Vous avez misez sur le bon numéro !\nVous venez de gagner \`${gains} coins\``)

            bot.db.query(`UPDATE user SET coins = coins + ${gains} WHERE guildId = "${message.guild.id}" AND userId = "${message.author.id}"`);
            message.reply({ mbeds: [winEmbed] });
        }
        gameInProgress.delete(message.author.id + message.channel.id);
    });
}
