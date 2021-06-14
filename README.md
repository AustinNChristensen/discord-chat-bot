# discord-chatbot

Adding new commands can be done by adding a new `.js` file within the `commands` folder.

It should have the shape:

```
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

You will also need to set the env var DISCORD_BOT_TOKEN_KEY to the secret token for your discord chatbot.

After that, all you need to do is add your bot to your server, and you can then communicate with it from any channel.

This app is based off of: https://discordjs.guide/popular-topics/embeds.html#embed-preview

To deploy with Kubernetes you must create a secret file containing the DISCORD_BOT_TOKEN_KEY env variable.

This can be done with
`kubectl create secret generic discord-chatbot --from-literal=DISCORD_BOT_TOKEN_KEY=<token>`