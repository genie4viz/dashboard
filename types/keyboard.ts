export enum KeyboardKeys {
  ARROW_DOWN = 'ArrowDown',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_UP = 'ArrowUp',
  ARROW_RIGHT = 'ArrowRight',
  ESCAPE = 'Escape',
  ENTER = 'Enter',
  SHIFT = 'Shift',
  CTRL = 'Ctrl',
  SPACE = 'Space',
}

export interface IControlKeyEvent {
  type: 'down' | 'up';
  key: KeyboardKeys;
}
