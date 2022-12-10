import { pingCommand } from './commands/ping.command';
import { prefixCommand } from './commands/prefix.command';
import { Commands } from './router/command.router.types';
import { disableHelper, enableHelper } from './commands/helper.command';
import { giveHelpCommand } from './commands/help.command';
import { legacyBanCommand } from './commands/ban.command';
import { legacyKickCommand } from './commands/kick.command';
import { linkDashyCommand, unlinkDashyCommand } from './commands/link.command';

export const commands: Commands = {
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
            args: ['prefix'],
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
    help: {
        alias: new Set(['h']),
        fn: giveHelpCommand,
        meta: {
            perms: 'open',
            help: 'Gives help.',
            args: ['Page Number'],
        },
    },
    lbanish: {
        alias: new Set([
            legacyBanCommand.commandName,
            'lban',
            'lOust',
            'lEvict',
        ]),
        fn: legacyBanCommand.runCommand,
        meta: {
            perms: 'owner',
            help: 'Performs a native ban on the mentioned userId',
            args: ['userId'],
        },
    },
    kick: {
        alias: new Set([legacyKickCommand.commandName, 'lkick', 'lk']),
        fn: legacyKickCommand.runCommand,
        meta: {
            perms: 'owner',
            help: 'Kicks the member of provided id',
            args: ['userId'],
        },
    },
    linkGuilded: {
        alias: new Set([linkDashyCommand.commandName, 'lg', 'gl']),
        fn: linkDashyCommand.runCommand,
        meta: {
            perms: 'open',
            help: 'Links your guilded account to your dashy account.',
            args: ['DashyId'],
        },
    },
    unlinkGuilded: {
        alias: new Set([unlinkDashyCommand.commandName, 'ulg', 'ugl']),
        fn: unlinkDashyCommand.runCommand,
        meta: {
            perms: 'open',
            help: 'Unlinks your guilded account to your dashy account.',
        },
    },
};
