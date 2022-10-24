import { IUser } from '@dashy/api-interfaces';
import { ModelServiceFactory } from '../factories/model-service.factory';
import { User } from '../schemas/users/users.schema';

export const UsersService = ModelServiceFactory.create<IUser>(User);
