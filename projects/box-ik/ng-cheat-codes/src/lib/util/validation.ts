
import { 
  BoxIkCheatCode,
  SpecialKeys,
  CheatCodeError,
  EmptyCheatCode,
  InvalidSymbolsInCheatCode,
  DuplicateCheatCode,
  UnreachableCheatCode
} from '../types';

export function isLowerCase(key: string): boolean {
  return key.toLowerCase() === key;
}

/**
 * Search invalid symbol presence in a cheat code
 * @param cheatCode 
 */
export function checkForInvalidSymbols(cheatCode: BoxIkCheatCode): CheatCodeError | null {

  if (cheatCode.code.length === 0) {
    return new EmptyCheatCode();
  }

  const allSpecialKeys = Object.values(SpecialKeys);
  const invalidSymbols = [];

  for(let char of cheatCode.code) {

    if (allSpecialKeys.includes(char)) {
      continue;
    }
    if (isLowerCase(char)) {
      continue;
    }
    invalidSymbols.push(char);
  }
  
  if (invalidSymbols.length > 0) {
    return new InvalidSymbolsInCheatCode(cheatCode, invalidSymbols);
  }
  return null;
}

/**
 * Check list of cheat codes for duplicates and unreachable codes
 * @param cheatCodes sorted list of cheat codes
 */
export function checkForListErrors(cheatCodes: BoxIkCheatCode[]): CheatCodeError[] | null {

  const errors = [];

  for(let i = 0; i < cheatCodes.length; ++i) {
    let current = cheatCodes[i];
    
    for (let j = i + 1; j < cheatCodes.length; ++j) {
      let other = cheatCodes[j];
      
      if (other.code === current.code) {
        errors.push(new DuplicateCheatCode(other));
      }
      if (other.code.endsWith(current.code)) {
        continue;
      }
      if (other.code.includes(current.code)) {
        errors.push(new UnreachableCheatCode(other, current));
      }
    }
  }

  if (errors.length > 0) {
    return errors;
  }
  return null;
}
