
import { BoxIkCheatCode, CheatCodeError } from './types';
import { sort } from './utils';
import { cheatCodeErrors, cheatCodeListErrors } from './validation';
import { merge } from 'rxjs';

export class CheatCodeStorage {

  get cheatCodes(): BoxIkCheatCode[] {
    return this._cheatCodes;
  }
  private _cheatCodes: BoxIkCheatCode[] = [];

  addList(cheatCodes: BoxIkCheatCode[]): CheatCodeError[] | null {

    let errors: CheatCodeError[] = [];
    const validCodes: BoxIkCheatCode[] = [];
    
    // validate each code
    for(let code of cheatCodes) {
      const codeError = cheatCodeErrors(code);
      if (codeError) {
        errors.push(codeError);
      } else {
        validCodes.push(code);
      }
    }

    // validate list
    const mergedList = sort([...this._cheatCodes, ...validCodes]);
    const listErrors = cheatCodeListErrors(mergedList);
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