import { Uuid } from './Uuid';

export class Entity<T> {
  // eslint-disable-next-line no-underscore-dangle
  protected readonly _id: Uuid;

  protected constructor(protected props: T, id?: Uuid) {
    this._id = id || Uuid.create();
  }

  get id(): Uuid {
    return this._id;
  }
}
