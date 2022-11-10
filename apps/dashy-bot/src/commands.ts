import { pingCommand } from './commands/ping.command';
import { prefixCommand } from './commands/prefix.command';
import { Commands } from './router/command.router.types';
import { disableHelper, enableHelper } from './commands/helper.command';
import { helpCommand } from './commands/help.command';

export const commands: Commands = {
    help: {
        alias: new Set(['h']),
        fn: helpCommand.sendHelp,
        meta: {
            perms: 'open',
            help: 'Gives help.',
        },
    },
    ping: {
        alias: new Set(['p', 'pong']),
        fn: pingCommand,
        meta: {
            perms: 'open',
            help: 'Tells the bot and api latency.',
        },
    },
    prefix: {
        alias: new Set(['pre']),
        fn: prefixCommand,
        meta: {
            perms: 'owner',
            help: 'Sets the prefix.',
        },
    },
    enableHelper: {
        alias: new Set(['eh']),
        fn: enableHelper,
        meta: {
            perms: 'owner',
            help: 'Enables interaction logging in official server.',
        },
    },
    disableHelper: {
        alias: new Set(['dh']),
        fn: disableHelper,
        meta: {
            perms: 'owner',
            help: 'Disables interaction logging in official server.',
        },
    },
};
