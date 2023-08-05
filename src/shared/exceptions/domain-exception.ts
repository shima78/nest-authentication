export abstract class DomainException extends Error {
  protected constructor(public readonly message: string) {
    super();
  }
}
