import { CommandFunc, ICommandRes } from '../command.types';
import { embedHelper } from '../../helpers/embeds/embeds.helper';
import { interactionResponseHandler } from '../../helpers/handlers/interaction-response.handler';

/**
 * Contructs a generic command, can be used to make fast commands, not recommended for stable commands currently
 */
export class CommandInteractionConstructor {
    commandName: string;
    private readonly runFunc: CommandFunc;

    constructor(commandName: string, runFunc: CommandFunc) {
        this.commandName = commandName;
        this.runFunc = runFunc;
    }

    runCommand: CommandFunc = async (client, message, args) => {
        const res = (await this.runFunc(client, message, args)) as ICommandRes;
        console;
        if (res.status === 500) {
            const sendEmbed = (await embedHelper.errorEmbed(client, message))
                .setTitle("Yikes... something's bad on our end...")
                .addField('Reason:', `Bot Error: ${res.data}`, true)
                .addField('To fix:', 'Please contact Dashy staff.', true);
            interactionResponseHandler(message, sendEmbed);
            return;
        }
        if (res.status === 400) {
            const sendEmbed = (await embedHelper.promptEmbed(client, message))
                .setTitle(`Error: ${this.commandName}`)
                .addField('Reason:', `User Error: ${res.data}`);
            interactionResponseHandler(message, sendEmbed);
            return;
        }
        if (res.status === 300) {
            const sendEmbed = (await embedHelper.errorEmbed(client, message))
                .setTitle(
                    `Uncontrollable guild-side error occured while running ${this.commandName}`
                )
                .addField('Reason:', `${res.data}`, true)
                .addField('To fix:', 'Follow up on reason.', true);
            interactionResponseHandler(message, sendEmbed);
            return;
        }
        if (res.status === 200) {
            const sendEmbed = (await embedHelper.successEmbed(client, message))
                .setTitle(`Success: ${this.commandName}`)
                .setDescription(`${res.data}`);
            interactionResponseHandler(message, sendEmbed);
        }
        if (res.status === 9000) {
            const sendEmbed = (await embedHelper.successEmbed(client, message))
                .setTitle(`Oof: ${this.commandName}`)
                .setDescription(
                    `You have encountered a special type of error, approach a developer to help.`
                )
                .addField('error', `${res.data}`);
            interactionResponseHandler(message, sendEmbed);
        }
        console.log(
            `command not using ${this.commandName} res code, data, use proper res.`
        );
    };
}
