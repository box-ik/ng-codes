
export enum SpecialKey {
  ArrowUp = 'U',
  ArrowRight = 'R',
  ArrowDown = 'D',
  ArrowLeft = 'L',
  Enter = 'E'
}

export const AllSpecialKeys = Object.values(SpecialKey);

export const UnusedKeys = ['Escape', 'Backspace', 'CapsLock', 'Tab'];

export const InputTags = ['input', 'textarea'];
