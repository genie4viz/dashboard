import { Keyboard } from '@app/lib/keyboard';
import { IControlKeyEvent, KeyboardKeys } from '@app/types/';
import { computed, observable } from 'mobx';

export class KeyboardStore {
  public readonly keyboard = new Keyboard();

  @computed
  get isShiftDown() {
    return this.keyboardKeysMap.get(KeyboardKeys.SHIFT) || false;
  }

  @computed
  get isEnterDown() {
    return this.keyboardKeysMap.get(KeyboardKeys.ENTER) || false;
  }

  @computed
  get isEscDown() {
    return this.keyboardKeysMap.get(KeyboardKeys.ESCAPE) || false;
  }

  @observable private keyboardKeysMap = observable.map();

  constructor() {
    this._setupEventHandlers();
  }

  private _setupEventHandlers = () => {
    this.keyboard.onControlLayoutUp(
      (a: IControlKeyEvent): void => {
        this.keyboardKeysMap.set(a.key, false);
      },
    );
    this.keyboard.onControlLayoutDown(
      (a: IControlKeyEvent): void => {
        this.keyboardKeysMap.set(a.key, true);
      },
    );
  };

  private initilizeListeners() {
    // window.addEventListener('wheel', this.onWheel);

    window.onblur = () => {
      this._isShiftDown = false;
    };

    document.addEventListener('focus', () => {
      this._isShiftDown = false;
    });
  }

  // private onWheel(e: WheelEvent) {
  //   // console.log(e)
  // }
}
