import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { FilterService } from './filter.service';

import { BadRequestError } from '../../shared/errors/BadRequestError';
import { UnprocessableEntityError } from '../../shared/errors/UnprocessableEntityError';
import { FilterDto } from './dto/filter.dto';
import { CreateFilterDto } from './dto/create-filter.dto';
import { Filter } from './models/filter.model';

@ApiTags('Filters')
@Controller('filters')
export class FilterController {
  constructor(
    @Inject('FilterService')
    private readonly filterService: FilterService,
  ) {}

  @Get('all')
  @ApiOperation({
    summary: 'Return all filters',
  })
  @ApiOkResponse({ description: 'Filters founded.', type: [FilterDto] })
  async getAll(): Promise<FilterDto[]> {
    const filters = await this.filterService.getAllFilters();

    return filters.map((filter) => FilterDto.toViewModel(filter));
  }

  @Post('create')
  @ApiOperation({
    summary: 'Creates a filter',
  })
  @ApiCreatedResponse({ description: 'Filter created.', type: FilterDto })
  @ApiBadRequestResponse({
    description: 'The request object does not match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation errors while creating filter',
    type: UnprocessableEntityError,
  })
  async createFilter(
    @Body() createFilter: CreateFilterDto,
  ): Promise<FilterDto> {
    const model = CreateFilterDto.fromViewModel(createFilter);
    model.id = await this.filterService.addNewFilter(model);

    return FilterDto.toViewModel(model);
  }

  @Patch('restore/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'filter id string',
    schema: { type: 'string' },
    type: 'string',
  })
  @ApiOperation({
    summary: 'Restore a filter',
  })
  @ApiCreatedResponse({ description: 'Filters Restored.', type: Filter })
  @ApiBadRequestResponse({
    description: 'The request object does not match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation errors while creating question',
    type: UnprocessableEntityError,
  })
  async restoreFilter(@Param('id') id: string) {
    return await this.filterService.restoreFilter(id);
  }

  @Delete('archive/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Filter id string',
    schema: { type: 'string' },
    type: 'string',
  })
  @ApiOperation({
    summary: 'Archive a Filter',
  })
  @ApiCreatedResponse({ description: 'Filters archived.', type: Filter })
  @ApiBadRequestResponse({
    description: 'The request object does not match the expected one',
    type: BadRequestError,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation errors while creating Filter',
    type: UnprocessableEntityError,
  })
  async archiveFilter(@Param('id') id: string) {
    return await this.filterService.archiveFilter(id);
  }
}
