
import { BoxIkCheatCode, CheatCodeError } from './types';
import { checkForInvalidSymbols, checkForListErrors } from './util';
import { sort } from './utils';

export class CheatCodeStorage {

  get cheatCodes(): BoxIkCheatCode[] {
    return this._cheatCodes;
  }
  private _cheatCodes: BoxIkCheatCode[] = [];

  add(cheatCodes: BoxIkCheatCode[]): CheatCodeError[] | null {

    let errors: CheatCodeError[] = [];
    const validCodes: BoxIkCheatCode[] = [];
    
    // validate each code
    for(let cheatCode of cheatCodes) {
      const codeError = checkForInvalidSymbols(cheatCode);
      if (codeError) {
        errors.push(codeError);
      } else {
        validCodes.push(cheatCode);
      }
    }

    // validate list
    const mergedList = sort([...this._cheatCodes, ...validCodes]);
    const listErrors = checkForListErrors(mergedList);
    if (listErrors) {
      errors = [...errors, ...listErrors];
    }
    
    this._cheatCodes = mergedList;

    if (errors.length > 0) {
      return errors;
    }
    return null;
  }

  clear() {
    this._cheatCodes = [];
  }
}