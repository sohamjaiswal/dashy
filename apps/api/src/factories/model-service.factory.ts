import { Model } from 'mongoose';
import { BaseDbModelService } from '../services/base-db-model.service';

export class ModelServiceFactory {
    static create<Interface>(model: Model<Interface>) {
        const modelService = new BaseDbModelService(model);
        return modelService;
    }
}
