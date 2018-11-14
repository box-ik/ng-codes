
import { BoxIkCode, SpecialKeys } from '../types';

export function normalizeKey(key: string): string {
  return SpecialKeys[key] || key.toLowerCase();
}

export function sortCodes(codes: BoxIkCode[]): BoxIkCode[] {
  return codes.sort((a, b) => {
    const lenDiff = a.value.length - b.value.length;
    if (!lenDiff) {
      return a.value.localeCompare(b.value);
    }
    return lenDiff;
  });
}