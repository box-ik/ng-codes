
import { SpecialKey, UnusedKeys } from './key-constants';

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

export function normalizeKey(key: string): string {
  return SpecialKey[key] || key.toLowerCase();
}