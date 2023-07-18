
# :robot: **CoinsBot V2 remade by ruwinou**

## :pencil: **Description**
T'as toujours réver d'avoir un système d'économie sur ton serveur mais t'as pas les moyens ? Voici le bot qui va te rendre heureux, avec un système de coins, de team, de métiers et bien plus encore ! ATTENTION C'EST UNE VERSION REMADE DU BOT COINS DE MILLENIUM https://discord.gg/epicbots (j'ai juste refait le bot)
Les commandes tels que &setprice, &settime ne sont pas disponible car vous pouvez les faire à la main puisque vous avez le code du bot, il sera peut-être disponible prochainement !
Les commandes tels que &setleaderboard, &arrest, &cambriolage, &kill ne sont pas disponible car ils sont en maintenance ou buggé !
Pour toute erreur veuillez rejoindre le serveur de support https://discord.gg/xkebY6nsxk 

## :gear: **Fonctionnalités**
- système d'économie

## :wrench: **Configuration**

### **Prérequis**
- Discord.js (version 14.11.0)
- mysql (version 2.18.1)
- phpMyAdmin (voir étape instalation)

### **Étapes d'installation**
1. Clone le repository : `git clone https://github.com/Ruwin-dsc/CoinsBot-V2.git`
2. Installe les dépendances : `npm install`
3. Utilise phpMyAdmin et met le fichier `coinsbot.sql` dessus si tu n'as pas phpMyAdmin ou que tu ne sais pas l'utiliser je t'invite à te rendre dans le serveur https://discord.gg/cloudhive et demander un hébergeur avec phpMyAdmin pour le coinsBot (de la part de ruwinou) C'EST TOTALEMENT GRATUIT !!! Toutefois si t'as d'autre problème je t'invite à te rendre dans le serveur https://discord.gg/xkebY6nsxk
4. Configure ton fichier de configuration `config.json` avec les informations nécessaires.
5. Lance le bot : `node index.js`

### **Configuration du fichier `config.json`**
```json
{
  "token": "TON_TOKEN_BOT",
  "prefix": "TON_PREFIXE",
  "ownerId": "ID_DU_BUYER",

  "linkbot": "Lien_du_bot",
  "BDD": {
        "host": "HOST",
        "port": "PORT",
        "user": "USER",
        "database": "coinsbot",
        "charset": "utf8mb4"
    }
  
}
```

## :raised_hands: **Contribution**
Si tu souhaites contribuer à ce projet, n'hésite pas à ouvrir une pull request !

## :page_facing_up: **License**
Ce projet est sous license Apache. Voir le fichier `LICENSE` pour plus d'informations.

## **Support**
Serveur Discord: https://discord.gg/xkebY6nsxk
Message Privé: ruwinou



