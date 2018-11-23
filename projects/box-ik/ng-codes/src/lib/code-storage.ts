import { Injectable } from '@angular/core';
import { BoxIkNgCodesServiceModule } from './ng-codes-service.module';
import { BoxIkCode, CodeError } from './types';
import { checkForInvalidSymbols, checkForListErrors } from './util';
import { sortCodes } from './util';

@Injectable({
  providedIn: BoxIkNgCodesServiceModule
})
export class CodeStorage {

  get codes(): BoxIkCode[] {
    return this._codes;
  }
  private _codes: BoxIkCode[] = [];

  add(codes: BoxIkCode[]): CodeError[] | null {

    let errors: CodeError[] = [];
    const validCodes: BoxIkCode[] = [];
    
    // validate each code
    for(let code of codes) {
      const codeError = checkForInvalidSymbols(code);
      if (codeError) {
        errors.push(codeError);
      } else {
        validCodes.push(code);
      }
    }

    // validate list
    let mergedList = sortCodes([...this._codes, ...validCodes]);
    const listErrors = checkForListErrors(mergedList);
    if (listErrors) {
      errors = [...errors, ...listErrors];
      // filter unreachable and duplicates
      const invalidCodes = listErrors.map(error => error.code);
      mergedList = mergedList.filter(code => !invalidCodes.includes(code));
    }

    this._codes = mergedList;

    if (errors.length > 0) {
      return errors;
    }
    return null;
  }

  clear() {
    this._codes = [];
  }
}