import { Injectable } from '@nestjs/common';
import { FilterRepository } from './repository/filter.repository';
import { Filter } from './models/filter.model';
import { EntityNotFoundException } from '../../shared/exceptions';
@Injectable()
export class FilterService {
  constructor(private repository: FilterRepository) {}
  addNewFilter(filter: Filter) {
    return this.repository.create(filter);
  }

  getAllFilters() {
    return this.repository.findAll();
  }

  async archiveFilter(id: string) {
    const filter: Filter = await this.repository.findById(id);
    if (!filter) throw new EntityNotFoundException();
    filter.archive();
    return this.repository.update(id, filter);
  }

  async restoreFilter(id: string) {
    const filter: Filter = await this.repository.findById(id);
    if (!filter) throw new EntityNotFoundException();
    filter.restore();
    return this.repository.update(id, filter);
  }
}
