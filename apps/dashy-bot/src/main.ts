import { Client } from 'guilded.js';

import { BOT_TOKEN as token } from '@dashy/secrets';

const client = new Client({ token });

client.on('ready', () => {
    console.log('Successfully logged in!');
});

client.on('messageCreated', async (message) => {
    if (message.content === 'ping') {
        await message.reply('Pong!');
        return;
    }
});

client.login();
