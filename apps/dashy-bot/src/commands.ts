import { pingCommand } from './commands/ping.command';
import { prefixCommand } from './commands/prefix.command';
import { Commands } from './router/command.router.types';

export const commands: Commands = {
    ping: {
        alias: new Set(['p', 'pong']),
        fn: pingCommand,
    },
    prefix: {
        alias: new Set(['pre']),
        fn: prefixCommand,
        meta: {
            perms: 'owner',
        },
    },
};
