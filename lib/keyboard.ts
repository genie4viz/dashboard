import { Emitter } from '@app/lib/event';
import { IControlKeyEvent, KeyboardKeys } from '@app/types/';

export class Keyboard {
  public _onControlLayoutDown = new Emitter<IControlKeyEvent>();

  public _onControlLayoutUp = new Emitter<IControlKeyEvent>();

  /**
   * Triggered when an controller key is unpressed.
   */
  public onControlLayoutUp = this._onControlLayoutUp.event;

  /**
   * Triggered when an controller key is pressed.
   */
  public onControlLayoutDown = this._onControlLayoutDown.event;

  constructor() {
    this._setupListeners();
  }

  public disposeListeners() {
    document.removeEventListener('keydown', this._keyboardListener('down'));
    document.removeEventListener('keyup', this._keyboardListener('up'));
  }

  private _setupListeners = () => {
    document.addEventListener('keydown', this._keyboardListener('down'));
    document.addEventListener('keyup', this._keyboardListener('up'));
  };

  private _keyboardListener = (type: 'down' | 'up') => {
    const ctrlemitter = type === 'down' ? this._onControlLayoutDown : this._onControlLayoutUp;

    return (event: KeyboardEvent) => {
      const ctrl = (key: any): IControlKeyEvent => ({ key, type });

      // so far we don't need preventDefault.
      // this._shouldPreventDefault(event) && event.preventDefault();

      switch (event.key) {
        case ' ':
          return ctrlemitter.emit(ctrl(KeyboardKeys.SPACE));
        case KeyboardKeys.ARROW_UP:
          return ctrlemitter.emit(ctrl(KeyboardKeys.ARROW_UP));
        case KeyboardKeys.ARROW_DOWN:
          return ctrlemitter.emit(ctrl(KeyboardKeys.ARROW_DOWN));
        case KeyboardKeys.ARROW_LEFT:
          return ctrlemitter.emit(ctrl(KeyboardKeys.ARROW_LEFT));
        case KeyboardKeys.ARROW_RIGHT:
          return ctrlemitter.emit(ctrl(KeyboardKeys.ARROW_RIGHT));
        case KeyboardKeys.SHIFT:
          return ctrlemitter.emit(ctrl(KeyboardKeys.SHIFT));
        case KeyboardKeys.ESCAPE:
          return ctrlemitter.emit(ctrl(KeyboardKeys.ESCAPE));
        case KeyboardKeys.ENTER:
          return ctrlemitter.emit(ctrl(KeyboardKeys.ENTER));
      }
    };
  };
}
