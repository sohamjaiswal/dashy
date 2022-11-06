import { IGuild } from '@dashy/api-interfaces';
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
        default: '!',
    },
});

GuildSchema.post('save', mongooseErrorHandler);

export const Guild = model<IGuild>('Guild', GuildSchema);
