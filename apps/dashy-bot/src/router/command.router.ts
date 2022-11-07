import {
    CommandRunner,
    Commands,
    ICommandRunnerCommand,
    Perms,
} from './command.router.types';
import { checkIntersection } from '../helpers/utils/check-intersection';
import { Client, Message } from 'guilded.js';
import { embedHelper } from '../helpers/embeds/embeds.helper';
import { checkOwner } from '../helpers/utils/check-owner';

export class CommandRouter {
    readonly commands: Commands;
    commandRouter: Map<string, ICommandRunnerCommand>;

    constructor(commands: Commands) {
        this.commands = commands;
        this.commandRouter = this.createCommandRouter(this.commands);
    }

    private createCommandRouter = (commands: Commands) => {
        const commandRouter = new Map<string, ICommandRunnerCommand>();
        const aliasSets: Set<string>[] = [];
        for (const command in commands) {
            aliasSets.push(commands[command].alias);
        }
        const hasRedundantAliases = checkIntersection(aliasSets);
        if (hasRedundantAliases)
            throw new Error(
                'Given commands object has redundant aliases, fix it.'
            );
        for (const command in commands) {
            const func = commands[command].fn;
            let perms: Perms = 'open';
            if (Object.hasOwn(commands[command], 'meta')) {
                if (Object.hasOwn(commands[command]['meta'], 'perms')) {
                    perms = commands[command]['meta']['perms'];
                }
            }
            if (Object.hasOwn(commands[command], 'alias')) {
                const aliases = [...commands[command].alias];
                aliases.forEach((alias) => {
                    commandRouter.set(alias, { func, perms });
                });
            }
            commandRouter.set(command, { func, perms });
        }
        return commandRouter;
    };

    commandRunner: CommandRunner = async (
        command: string,
        args: string[],
        client: Client,
        message: Message
    ) => {
        if (this.commandRouter.get(command)) {
            const runCommand = this.commandRouter.get(command).func;
            const minRunPerms = this.commandRouter.get(command).perms;
            if (minRunPerms === 'owner') {
                if (!(await checkOwner(message, client))) {
                    const sendEmbed = await embedHelper.errorEmbed(
                        client,
                        message
                    );
                    sendEmbed
                        .setTitle("Couldn't run the command!")
                        .setDescription(
                            'Only owner can run this command currently.'
                        );
                    await message
                        .reply(sendEmbed)
                        .catch((err) => console.log(err));
                    return;
                }
            }
            // TODO implement protected commands
            runCommand(client, message, args);
            return;
        }
        const sendEmbed = await embedHelper.errorEmbed(client, message);
        sendEmbed
            .setTitle('Command not found!')
            .setDescription(`No command called, "${command}" was found.`);
        await message.reply(sendEmbed).catch((err) => console.log(err));
        return;
    };
}
