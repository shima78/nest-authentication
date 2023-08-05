import { Filter } from '../models/filter.model';

import { FilterDto } from './filter.dto';

export class CreateFilterDto extends FilterDto {
  static fromViewModel(dto: CreateFilterDto): Filter {
    const { name, category } = dto;
    return new Filter(name, category);
  }
}
