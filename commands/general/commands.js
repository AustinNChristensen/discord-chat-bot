module.exports = {
    name: 'commands',
    description: 'This function will return a list of all available commands and their descriptions',
    usage: 'commands',
    help: 'This function will return a list of all available commands and their descriptions',
    execute(message, args) {
        const data = [];
        data.push(message.client.commands.map((command) => `${command.name} - ${command.description}`).join('\n\n'));
        message.channel.send(data, { split: true })
    }
}