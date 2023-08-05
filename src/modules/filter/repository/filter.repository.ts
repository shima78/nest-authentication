import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Filter } from '../models/filter.model';
import { BaseRepository } from '../../../shared/database/base.repository';

import { FilterDocument } from '../schema/filter.schema';

@Injectable()
export class FilterRepository extends BaseRepository<
  FilterDocument,
  Filter,
  string
> {
  constructor(protected model: Model<FilterDocument>) {
    super(model);
  }
  protected mapTo(plainObj: any): Filter {
    const { name, category } = plainObj;
    return new Filter(name, category);
  }
  async findAll(): Promise<Filter[]> {
    const result = await this.model.find({ archived: false }).exec();
    return result.map((doc) => doc.toObject());
  }
}
