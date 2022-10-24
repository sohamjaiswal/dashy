import { FilterQuery, Model, Schema } from 'mongoose';
import { IDbModelService } from '@dashy/api-interfaces';
import { ErrorFormatter } from '../constants/errors';

export class BaseDbModelService<Interface>
    // prettier-ignore
    implements IDbModelService<Interface>
{
    model: Model<Interface>;
    errors: ErrorFormatter;

    constructor(model: Model<Interface>) {
        this.model = model;
        this.errors = new ErrorFormatter(model.modelName as string);
    }

    async create(props: Partial<Interface>): Promise<Interface> {
        return await this.model.create({ ...props }).catch((err) => {
            throw new Error(err);
        });
    }

    async deleteById(id: Schema.Types.ObjectId): Promise<Interface> {
        const deleted = await this.model.findByIdAndDelete(id).catch(() => {
            throw new Error(this.errors.internalError());
        });
        if (!deleted) throw new Error(this.errors.notFound());
        return deleted;
    }

    async findOne(query: FilterQuery<Interface>): Promise<Interface> {
        const match = await this.model.findOne({ ...query }).catch(() => {
            throw new Error(this.errors.internalError());
        });
        if (!match) throw new Error(this.errors.notFound());
        return match;
    }

    async findMany(query: FilterQuery<Interface>): Promise<Interface[]> {
        const matches = await this.model.find({ ...query }).catch(() => {
            throw new Error(this.errors.internalError());
        });
        return matches;
    }

    async findById(id: Schema.Types.ObjectId): Promise<Interface> {
        const match = await this.model.findById(id).catch(() => {
            throw new Error(this.errors.internalError());
        });
        if (!match) throw new Error(this.errors.notFound());
        return match;
    }

    async updateById(
        id: Schema.Types.ObjectId,
        props: Partial<Interface>
    ): Promise<Interface> {
        const match = await this.model.findById(id).catch(() => {
            throw new Error(this.errors.internalError());
        });
        if (!match) throw new Error(this.errors.notFound());
        for (const key of Object.keys(props)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            match[key] = props[key];
        }
        await match.save().catch(() => {
            throw new Error(this.errors.internalError());
        });
        return match;
    }
}
