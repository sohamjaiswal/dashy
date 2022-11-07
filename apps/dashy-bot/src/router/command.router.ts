import { CommandRunner, Commands } from './command.router.types';
import { CommandFunc } from '../commands/command.types';
import { checkIntersection } from '../helpers/utils/check-intersection';
import { Client, Message } from 'guilded.js';
import { embedHelper } from '../helpers/embeds/embeds.helper';

export class CommandRouter {
    readonly commands: Commands;
    commandRouter: Map<string, CommandFunc>;

    constructor(commands: Commands) {
        this.commands = commands;
        this.commandRouter = this.createCommandRouter(this.commands);
    }

    private createCommandRouter = (commands: Commands) => {
        const commandRouter = new Map<string, CommandFunc>();
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
            const aliases = [...commands[command].alias];
            const func = commands[command].fn;
            aliases.forEach((alias) => {
                commandRouter.set(alias, func);
            });
            commandRouter.set(command, func);
        }
        return commandRouter;
    };

    commandRunner: CommandRunner = async (
        command: string,
        args: string[],
        client: Client,
        message: Message
    ) => {
        if (this.commandRouter.get(command))
            return this.commandRouter.get(command)(client, message, args);
        const sendEmbed = await embedHelper.errorEmbed(client, message);
        sendEmbed
            .setTitle('Command not found!')
            .setDescription(`No command called, "${command}" was found.`);
        await message.reply(sendEmbed).catch((err) => console.log(err));
        return;
    };
}
