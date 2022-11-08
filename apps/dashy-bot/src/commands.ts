import { pingCommand } from './commands/ping.command';
import { prefixCommand } from './commands/prefix.command';
import { Commands } from './router/command.router.types';
import { disableHelper, enableHelper } from './commands/helper.command';

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
    enableHelper: {
        alias: new Set(['eh']),
        fn: enableHelper,
        meta: { perms: 'owner' },
    },
    disableHelper: {
        alias: new Set(['dh']),
        fn: disableHelper,
        meta: { perms: 'owner' },
    },
};
