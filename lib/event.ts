// Ref: https://github.com/osmanmesutozcan/squid/blob/master/src/lib/event.ts

import * as uuid from 'uuid/v4';

export class Emitter<T> {
  public _uuid = uuid();

  public _target = new EventTarget();

  public emit(data: T) {
    this._target.dispatchEvent(new CustomEvent(this._uuid, { detail: { ...data } }));
  }

  get event() {
    return (callback: () => void) => {
      const wrapper = (e: CustomEvent<T>): void => callback(e.detail);

      this._target.addEventListener(this._uuid, wrapper as EventListener);

      return this._target.removeEventListener.bind(
        this._target,
        this._uuid,
        wrapper as EventListener,
      );
    };
  }
}
