module.exports = {
    name: 'hey',
    description: 'Sample of how to write a command',
    usage: 'hey',
    help: 'Just say hey and see what happens',
    execute(message, args) {
        message.channel.send('Hello!')
    }
}