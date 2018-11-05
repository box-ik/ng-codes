
import { BoxIkCheatCode, SpecialKeys } from './types';



export function normalizeKey(key: string): string {
  return SpecialKeys[key] || key.toLowerCase();
}


export function sort(cheatCodes: BoxIkCheatCode[]): BoxIkCheatCode[] {
  return cheatCodes.sort((a, b) => {
    if (a.code < b.code) { return -1; }
    if (a.code > b.code) { return 1; }
    return 0;
  });
}