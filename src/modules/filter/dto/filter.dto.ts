import { Filter } from '../models/filter.model';
import { ApiProperty } from '@nestjs/swagger';

export class FilterDto {
  @ApiProperty({
    description: 'The name of the filter',
    example: 'Restaurant',
  })
  name: string;

  @ApiProperty({
    description: 'The category of the filter',
    example: 'Food',
  })
  category: string;

  @ApiProperty({
    description: 'Is filter deleted',
    example: 'true',
  })
  archived: boolean;

  static toViewModel(model: Filter): FilterDto {
    const { name, category, archived } = model;
    return { name, category, archived };
  }
}
