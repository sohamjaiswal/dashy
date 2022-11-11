import { Commands } from '../router/command.router.types';
import { CommandFunc, CommandsToHelpObj, IHelpObj } from './command.types';
import { embedHelper } from '../helpers/embeds/embeds.helper';
import { guildsService } from '../services/guilds.service';
import { paginator } from '../helpers/utils/paginator';
import { IBotGuild } from '@dashy/api-interfaces';
import { helpCommand } from '../main';
import { interactionResponseHandler } from '../helpers/handlers/interaction-response.handler';

export class HelpCommand {
    readonly commands: Commands;
    readonly helpObjs: {
        commandName: string;
        aliases: string;
        help: string;
        reqPerms: string;
    }[];

    constructor(commands: Commands) {
        this.commands = commands;
        this.helpObjs = this.commandsToHelpObjs(this.commands);
    }

    private commandsToHelpObjs: CommandsToHelpObj = (commands) => {
        const commandHelpList: IHelpObj[] = [];
        for (const command in commands) {
            const helpObj: IHelpObj = {
                commandName: command,
                aliases: new String().concat(
                    ...Array.from(commands[command]['alias']).map(
                        (alias) => `"${alias}" `
                    )
                ),
                help: this.commands[command]['meta']['help'],
                reqPerms: this.commands[command]['meta']['perms'],
            };
            commandHelpList.push(helpObj);
        }
        return commandHelpList;
    };
    public sendHelp: CommandFunc = async (client, message, args) => {
        const serverPre = (
            (await guildsService.getGuild(message.serverId).catch((err) => {
                throw new Error(err);
            })) as IBotGuild
        ).prefix;
        if (parseInt(args[0])) {
            const page: IHelpObj[] = paginator(
                this.helpObjs,
                5,
                parseInt(args[0])
            );
            const sendEmbed = (await embedHelper.genericEmbed(client, message))
                .setTitle(`Help!`)
                .setDescription(`Help for page: ${args[0]}`);
            page.forEach((line) => {
                sendEmbed.addField(
                    `${serverPre}${line.commandName}`,
                    `Alias: ${line.aliases}\nDesc: ${line.help}\nPerms: ${line.reqPerms}`,
                    true
                );
            });
            interactionResponseHandler(message, sendEmbed);
            return;
        }
        const sendEmbed = (await embedHelper.errorEmbed(client, message))
            .setTitle('Mention page number!')
            .setDescription(
                `Usage: ${serverPre}help 1 \n Format: ${serverPre}help <PageNumber>`
            );
        interactionResponseHandler(message, sendEmbed);
        return;
    };
}

export const giveHelpCommand: CommandFunc = (client, message, args) => {
    helpCommand.sendHelp(client, message, args);
    return;
};
