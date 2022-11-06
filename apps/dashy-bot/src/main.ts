import { Client } from 'guilded.js';

import { BOT_TOKEN as token } from '@dashy/secrets';

import { guildInstancer } from './controllers/guilds.controller';

const client = new Client({ token });

client.on('ready', () => {
    console.log('Successfully logged in!');
});

client.on('messageCreated', async (message) => {
    // pre processors
    if (message.createdByBotId) return;
    const guildReg = await guildInstancer(message.serverId);

    //command processors
    if (message.content === 'ping') {
        await message.reply('Pong!');
        return;
    }
});

client.login();
