const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const client = new Discord.Client();

const commandFolders = fs.readdirSync(`${__dirname}/commands`);

// once = run only one time
client.once('ready', () => {
    console.log('Discord Client Ready');
});

// create empty collection
client.commands = new Discord.Collection();

// add commands dynamically
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`${__dirname}/commands/${folder}`).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
    for (const file of commandFiles){
        const command = require(`./commands/${folder}/${file}`);
        // add a command, key is the command name, set value to the whole module
        client.commands.set(command.name, command);
    }
}

// on = run every time
client.on('message', message => {
    if(message.author.bot) return;
    const args = message.content.trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName === 'help') {
        const actualCommand = args[0];
        const command = client.commands.get(actualCommand);

        let reply = `Here is the help information I could find for: ${command.name}`;

        if(command.help){
            reply += `\nHELP\n${command.help}`;
        }
        if (command.usage) {
            reply += `\nUSAGE\n ${command.usage}`
        }

        return message.channel.send(reply);
    }

    // todo - make this return the 'what can I do?' command
    // if the command does not exist..
    if (!client.commands.has(commandName)) {
        message.channel.send(`I'm not sure what you were trying to do. Here is a list of available commands`);
        try {
            return client.commands.execute.get('commands').execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('Oops, there was an error: ' + error);
        }
    }

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
        let reply = `You didn't provide arguments for the command: ${commandName}.`;
        if (command.usage) {
            reply += `\nHere's an example of how to use \`${commandName}: ${command.usage}\``
        }
        return message.channel.send(reply)
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Oops, there was an error: ' + error);
    }
})


client.login(process.env.DISCORD_BOT_TOKEN_KEY);