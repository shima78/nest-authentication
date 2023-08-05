export abstract class AbstractEntity<ID> {
  id: ID;

  equals(entity: AbstractEntity<ID>): boolean {
    if (!(entity instanceof AbstractEntity)) return false;

    return this.id === entity.id;
  }
}
