
import { BoxIkCheatCode, CheatCodeSymbolsError, CheatCodeUnreachableError, CheatCodeDuplicateError, CheatCodeError } from './types';
import { SpecialKey, AllSpecialKeys } from './constants';
import { isLowerCase } from './utils';

/**
 * Check for invalid symbols in cheat code
 * @param cheatCode 
 */
export function cheatCodeErrors(cheatCode: BoxIkCheatCode): CheatCodeSymbolsError | null {
  const invalidSymbols = [];
  for(let char of cheatCode[0]) {
    if (AllSpecialKeys.includes(char)) {
      continue;
    }
    if (isLowerCase(char)) {
      continue;
    }
    invalidSymbols.push(char);
  }
  if (invalidSymbols.length > 0) {
    return new CheatCodeSymbolsError(cheatCode, invalidSymbols);
  }
  return null;
}

/**
 * Check for unreachable cheat codes
 * @param cheatCodes sorted list of codes
 */
export function cheatCodeListErrors(cheatCodes: BoxIkCheatCode[]): CheatCodeError[] | null {
  let errors = [];
  for(let i = 0; i < cheatCodes.length; ++i) {
    let code = cheatCodes[i];
    for (let j = 1; j < cheatCodes.length; ++j) {
      let other = cheatCodes[j];
      if (other[0] === code[0]) {
        errors.push(new CheatCodeDuplicateError(other));
      }
      if (other[0].endsWith(code[0])) {
        continue;
      }
      if (other.includes(code)) {
        errors.push(new CheatCodeUnreachableError(code, other));
      }
    }
  }
  if (errors.length > 0) {
    return errors;
  }
  return null;
}
