import { Client } from 'guilded.js';

import { BOT_TOKEN as token, DEFAULT_BOT_PREFIX } from '@dashy/secrets';

import { guildInstancer } from './controllers/guilds.controller';
import { embedHelper } from './helpers/embeds/embeds.helper';
import { CommandRouter } from './router/command.router';
import { commands } from './commands';
import { GuildedRestService } from './services/guilded-rest.service';
import { RestManager, Router } from '@guildedjs/rest';
import { HelpCommand } from './commands/help.command';

const client = new Client({ token });

// commands dependent stuff
export const helpCommand = new HelpCommand(commands);
const commandRouter = new CommandRouter(commands);

export const guildedRestService = new GuildedRestService(
    new Router(new RestManager({ token }))
);

client.on('ready', () => {
    console.log('Successfully logged in!');
});

client.on('messageCreated', async (message) => {
    // pre command processors
    let prefix = DEFAULT_BOT_PREFIX;
    // register guild if not registered already
    const guildReg = await guildInstancer(message.serverId);
    if (guildReg.success) {
        const sendEmbed = await embedHelper.successEmbed(client, message);
        sendEmbed.setTitle(guildReg.title).setDescription(guildReg.description);
        await message.send(sendEmbed).catch((err) => console.log(err));
    }
    try {
        prefix = guildReg.extra.prefix as string;
    } catch {
        throw new Error(
            `Some shit happened with the prefix of server: ${guildReg.extra.guildId}`
        );
    }
    // command processors
    if (message.content.startsWith(prefix)) {
        const [command, ...args] = message.content
            .slice(prefix.length)
            .split(' ')
            .filter((word) => word !== '');
        commandRouter
            .commandRunner(command, args, client, message)
            .catch((err) => {
                throw new Error(err);
            });
    }
    // post command processors
});

client.login();
