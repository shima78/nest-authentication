import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { BaseRepository } from '../../../shared/database/base.repository';

import { UserDocument } from '../schema/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument, User, string> {
  constructor(protected model: Model<UserDocument>) {
    super(model);
  }
  protected mapTo(plainObj: any): User {
    const { name, email, password } = plainObj;
    return new User(name, email, password);
  }
  async findByEmail(email) {
    const result = await this.model.findOne({ email: email }).exec();
    return result.toObject();
  }
}
