import { IGuild } from '@dashy/api-interfaces';
import { DEFAULT_BOT_PREFIX } from '@dashy/secrets';
import { model, Schema } from 'mongoose';
import { mongooseErrorHandler } from '../../util/db/error-handler';

const GuildSchema = new Schema({
    guildId: {
        type: String,
        required: [true, 'Guild ID is required.'],
        unique: [true, 'Guild ID already exists.'],
    },
    prefix: {
        type: String,
        required: [true, 'The guild needs a prefix for bot to function.'],
        default: DEFAULT_BOT_PREFIX,
    },
    helper: {
        isHelper: {
            type: Boolean,
            required: [
                true,
                'The guild needs to be determinantly a helper or not.',
            ],
            default: false,
        },
        helperChannel: {
            type: String,
            required: [
                true,
                "The support helper channel must be set, even '' will suffice.",
            ],
            default: "''",
        },
    },
});

GuildSchema.post('save', mongooseErrorHandler);

export const Guild = model<IGuild>('Guild', GuildSchema);
