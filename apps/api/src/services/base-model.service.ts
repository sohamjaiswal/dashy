import { IGuild, IUser } from '@dashy/api-interfaces';
import { ModelServiceFactory } from '../factories/model-service.factory';
import { Guild } from '../schemas/guilds/guilds.schema';
import { User } from '../schemas/users/users.schema';

export const UsersService = ModelServiceFactory.create<IUser>(User);
export const GuildService = ModelServiceFactory.create<IGuild>(Guild);
