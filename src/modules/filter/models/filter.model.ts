import { AbstractEntity } from '../../../shared/models';

export class Filter extends AbstractEntity<string> {
  name: string;
  category: string;
  archived: boolean;
  constructor(name: string, category: string) {
    super();
    this.name = name;
    this.archived = false;
    this.category = category;
  }
  archive() {
    this.archived = true;
  }
  restore() {
    this.archived = false;
  }
}
