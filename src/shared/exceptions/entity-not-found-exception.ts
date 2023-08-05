import { DomainException } from './domain-exception';

export class EntityNotFoundException extends DomainException {
  constructor() {
    super('Entity not found');
  }
}
