export abstract class AbstractValueObject {
  equals(valueObject: AbstractValueObject): boolean {
    return this.getHashCode() === valueObject.getHashCode();
  }

  public getHashCode(): string {
    return JSON.stringify(this);
  }
}
