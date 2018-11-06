
import { BoxIkCheatCode, SpecialKeys } from '../types';

export function normalizeKey(key: string): string {
  return SpecialKeys[key] || key.toLowerCase();
}

export function sortCheatCodes(cheatCodes: BoxIkCheatCode[]): BoxIkCheatCode[] {
  return cheatCodes.sort((a, b) => {
    const lenDiff = a.code.length - b.code.length;
    if (!lenDiff) {
      return a.code.localeCompare(b.code);
    }
    return lenDiff;
  });
}