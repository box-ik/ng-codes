
import { 
  BoxIkCode,
  SpecialKeys,
  CodeError,
  EmptyCode,
  InvalidSymbolsInCode,
  DuplicateCode,
  UnreachableCode
} from '../types';

export function isLowerCase(key: string): boolean {
  return key.toLowerCase() === key;
}

/**
 * Search invalid symbol presence in a code
 * @param code 
 */
export function checkForInvalidSymbols(code: BoxIkCode): CodeError | null {

  if (code.value.length === 0) {
    return new EmptyCode();
  }

  const allSpecialKeys = Object.values(SpecialKeys);
  const invalidSymbols = [];

  for(let char of code.value) {

    if (allSpecialKeys.includes(char)) {
      continue;
    }
    if (isLowerCase(char)) {
      continue;
    }
    invalidSymbols.push(char);
  }
  
  if (invalidSymbols.length > 0) {
    return new InvalidSymbolsInCode(code, invalidSymbols);
  }
  return null;
}

/**
 * Check list of codes for duplicates and unreachable codes
 * @param codes sorted list of codes
 */
export function checkForListErrors(codes: BoxIkCode[]): CodeError[] | null {

  const errors = [];

  for(let i = 0; i < codes.length; ++i) {
    let current = codes[i];
    
    for (let j = i + 1; j < codes.length; ++j) {
      let other = codes[j];
      
      if (other.value === current.value) {
        errors.push(new DuplicateCode(other));
      }
      if (other.value.endsWith(current.value)) {
        continue;
      }
      if (other.value.includes(current.value)) {
        errors.push(new UnreachableCode(other, current));
      }
    }
  }

  if (errors.length > 0) {
    return errors;
  }
  return null;
}
