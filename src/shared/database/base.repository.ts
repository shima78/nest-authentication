import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseRepository<M extends Document, E, ID> {
  constructor(protected readonly model: Model<M>) {}
  protected abstract mapTo(plainObj: any): E;

  async create(doc: E): Promise<ID> {
    const createdEntity = new this.model(doc);
    const savedResult = await createdEntity.save();
    return savedResult.id;
  }

  async findById(id: ID): Promise<E | null> {
    const result = await this.model.findOne({ _id: id });
    if (result) {
      return this.mapTo(result.toObject());
    }
    return null;
  }

  async findAll(): Promise<E[]> {
    const result = await this.model.find().exec();
    if (result) {
      return result.map((doc) => this.mapTo(doc.toObject()));
    }
    return null;
  }

  async update(id: ID, item: E): Promise<E> {
    const result = await this.model.findByIdAndUpdate(id, item).exec();
    return this.mapTo(result.toObject());
  }
}
