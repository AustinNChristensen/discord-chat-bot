# discord-chat-bot

Adding new commands can be done by adding a new `.js` file within the `commands` folder.

It should have the shape: ```
module.exports = {
    name: <unique string>,
    description: <description>,
    usage: <usage example>,
    help: '<how to use the command',
    execute(message, args) {
        // command execution that usually results in message.channel.send('some message');
        // the message object has access to the client at message.client.*
       }
}

```
