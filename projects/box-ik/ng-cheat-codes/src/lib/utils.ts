
import { BoxIkCheatCode, SpecialKeys } from './types';

export function filterKeysWithModifiers(event: KeyboardEvent): boolean {
  return !(
    event.shiftKey ||
    event.ctrlKey ||
    event.altKey ||
    event.metaKey
  );
}

export function filterUnusedKeys(event: KeyboardEvent): boolean {
  const unusedKeys = ['Escape', 'Backspace', 'CapsLock', 'Tab'];
  return !unusedKeys.includes(event.key);
}

export function filterAllWhenInputTagActive(): boolean {
  const inputTags = ['input', 'textarea'];
  return !inputTags.includes(activeTag());
}

export function normalizeKey(key: string): string {
  return SpecialKeys[key] || key.toLowerCase();
}

export function activeTag(): string {
  return document.activeElement.tagName.toLowerCase();
}

export function sort(cheatCodes: BoxIkCheatCode[]): BoxIkCheatCode[] {
  return cheatCodes.sort((a, b) => {
    if (a.code < b.code) { return -1; }
    if (a.code > b.code) { return 1; }
    return 0;
  });
}