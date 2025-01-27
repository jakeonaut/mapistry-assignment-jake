import crypto from 'crypto';

export class Uuid {
  // eslint-disable-next-line no-underscore-dangle
  private readonly _id: string;

  protected constructor(id: string) {
    this._id = id;
  }

  public get value(): string {
    return this._id;
  }

  public toString(): string {
    return this.value;
  }

  public equals(id?: Uuid | string): boolean {
    if (id instanceof Uuid) {
      return id.value === this.value;
    }
    if (typeof id === 'string') {
      return id === this._id;
    }
    return false;
  }

  public static create(givenId?: string | null): Uuid {
    if (!givenId) return new Uuid(crypto.randomUUID());
    // we don't validate that it's a proper uuid so we can support composite IDs
    return new Uuid(givenId);
  }

  public static isValid(givenId: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      givenId,
    );
  }
}
