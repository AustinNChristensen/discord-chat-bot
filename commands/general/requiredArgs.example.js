module.exports = {
    name: 'required-args',
    description: 'Sample of how to write a command with required arguments',
    args: true,
    usage: 'required-args <anything>',
    help: 'This is an example of how you could require arguments and be short circuited out before execution if you don\'t provide them',
    execute(message, args) {
        const data = [];
        data.push(args.map((arg) => arg).join(', '));
        message.channel.send(data, { split: true });
    }
}