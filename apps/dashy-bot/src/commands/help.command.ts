import { Commands } from '../router/command.router.types';
import { CommandFunc, CommandsToHelpObj, IHelpObj } from './command.types';
import { embedHelper } from '../helpers/embeds/embeds.helper';
import { guildsService } from '../services/guilds.service';
import { paginator } from '../helpers/utils/paginator';
import { IBotGuild } from '@dashy/api-interfaces';
import { helpCommand, guildedRestService } from '../main';
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
                aliases: commands[command]['alias']
                    ? new String().concat(
                          ...Array.from(commands[command]['alias']).map(
                              (alias) => `"${alias}" `
                          )
                      )
                    : '**None**',
                help: commands[command]['meta']['help']
                    ? commands[command]['meta']['help']
                    : '**Not Available**',
                reqPerms: commands[command]['meta']['perms']
                    ? commands[command]['meta']['perms']
                    : '**Not Available**',
                usage: `**${command}**`.concat(
                    commands[command]['meta']['args']
                        ? commands[command]['meta']['args']
                              .map((arg) => ` <${arg}>`)
                              .join(' ')
                        : ' **(no args)**'
                ),
            };
            commandHelpList.push(helpObj);
        }
        return commandHelpList;
    };
    public sendHelp: CommandFunc = async (client, message, args) => {
        guildedRestService.deleteMessage(message);
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
                    `Alias: ${line.aliases}\nDesc: ${line.help}\nPerms: ${line.reqPerms}\nUsage: ${line.usage}`,
                    true
                );
            });
            interactionResponseHandler(message, sendEmbed, true);
            return;
        }
        const sendEmbed = (await embedHelper.errorEmbed(client, message))
            .setTitle('Mention page number!')
            .setDescription(
                `Usage: ${serverPre}help 1 \n Format: ${serverPre}help <PageNumber>`
            );
        interactionResponseHandler(message, sendEmbed, true);
        return;
    };
}

export const giveHelpCommand: CommandFunc = (client, message, args) => {
    helpCommand.sendHelp(client, message, args);
    return;
};
