import { commands } from '../commands';
import { Commands } from '../router/command.router.types';
import { CommandFunc } from './command.types';
import { embedHelper } from '../helpers/embeds/embeds.helper';
import { guildsService } from '../services/guilds.service';
import { paginator } from '../helpers/utils/paginator';
import { IBotGuild } from '@dashy/api-interfaces';

export class HelpCommand {
    readonly commands: Commands;
    readonly helpsObj: {
        commandName: string;
        aliases: string;
        help: string;
        reqPerms: string;
    }[];

    constructor(commands: Commands) {
        this.commands = commands;
        this.helpsObj = this.commandsToHelpObj();
    }

    private commandsToHelpObj: () => {
        commandName: string;
        aliases: string;
        help: string;
        reqPerms: string;
    }[] = () => {
        const commandHelpList = [];
        console.log('here');
        for (const command in this.commands) {
            const helpObj = {
                commandName: command,
                aliases: new String().concat(
                    ...Array.from(this.commands[command]['alias']).map(
                        (alias) => `"${alias}" `
                    )
                ),
                help: this.commands[command]['meta']['help'],
                reqPerms: this.commands[command]['meta']['perms'],
            };
            console.log(helpObj);
            commandHelpList.push(helpObj);
        }
        return commandHelpList;
    };
    sendHelp: CommandFunc = async (client, message, args) => {
        const serverPre = (
            (await guildsService.getGuild(message.serverId).catch((err) => {
                throw new Error(err);
            })) as IBotGuild
        ).prefix;
        if (parseInt(args[0])) {
            const page: {
                commandName: string;
                aliases: string;
                help: string;
                reqPerms: string;
            }[] = paginator(this.helpsObj, 10, parseInt(args[0]));
            const sendEmbed = (await embedHelper.genericEmbed(client, message))
                .setTitle(`Help!`)
                .setDescription(`Help for page: ${args[0]}`);
            page.forEach((line) => {
                sendEmbed.addField(
                    `${line.commandName}`,
                    `Alias: ${line.aliases}\nDesc: ${line.help}\nPerms: ${line.reqPerms}`
                );
            });
            message.reply(sendEmbed);
            return;
        }
        const sendEmbed = (await embedHelper.errorEmbed(client, message))
            .setTitle('Mention page number!')
            .setDescription(
                `Usage: ${serverPre}help 1 \n Format: ${serverPre}help <PageNumber>`
            );
        message.reply(sendEmbed);
        return;
    };
}

export const helpCommand = new HelpCommand(commands);
