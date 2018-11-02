
import { SpecialKey, UnusedKeys, InputTags } from './constants';

export function filterKeysWithModifiers(event: KeyboardEvent): boolean {
  return !(
    event.shiftKey ||
    event.ctrlKey ||
    event.altKey ||
    event.metaKey
  );
}

export function filterUnusedKeys(event: KeyboardEvent): boolean {
  return !UnusedKeys.includes(event.key);
}

export function filterAllWhenInputTagActive(): boolean {
  return !InputTags.includes(activeTag());
}

export function normalizeKey(key: string): string {
  return SpecialKey[key] || key.toLowerCase();
}

export function activeTag(): string {
  return document.activeElement.tagName.toLowerCase();
}
