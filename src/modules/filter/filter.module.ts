import { Module } from '@nestjs/common';
import { FilterController } from './filter.controller';
import { FilterService } from './filter.service';
import { FilterRepository } from './repository/filter.repository';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import {
  FilterDocument,
  FilterModel,
  FilterSchema,
} from './schema/filter.schema';
import { Model } from 'mongoose';
import { AuthModule } from '../../core/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: FilterSchema.name, schema: FilterModel },
    ]),
  ],
  controllers: [FilterController],
  providers: [
    {
      provide: FilterRepository,
      useFactory: (model: Model<FilterDocument>) => new FilterRepository(model),
      inject: [getModelToken(FilterSchema.name)],
    },
    {
      provide: 'FilterService',
      useFactory: (repo: FilterRepository) => new FilterService(repo),
      inject: [FilterRepository],
    },
  ],
})
export class FilterModule {}
