const fs = require("fs");

module.exports = (bot) => {
  const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const props = require(`../commands/${file}`);
    console.log(`✅・${file}`);
    bot.commands.set(props.help.name, props);

    if (props.help.aliases && Array.isArray(props.help.aliases)) {
      props.help.aliases.forEach((alias) => {
        bot.commands.set(alias, props);
      });
    }
  }

  const commandSubFolders = fs
    .readdirSync("./commands/")
    .filter((folder) => !folder.endsWith(".js"));

  for (const folder of commandSubFolders) {
    const subCommandFiles = fs
      .readdirSync(`./commands/${folder}/`)
      .filter((file) => file.endsWith(".js"));

    for (const file of subCommandFiles) {
      const props = require(`../commands/${folder}/${file}`);
      console.log(`✅・${file} - ${folder} [Commande]`);
      bot.commands.set(props.help.name, props);

      if (props.help.aliases && Array.isArray(props.help.aliases)) {
        props.help.aliases.forEach((alias) => {
          bot.commands.set(alias, props);
        });
      }
    }
  }
};
