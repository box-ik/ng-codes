
import { BoxIkCode, EmptyCode, InvalidSymbolsInCode, DuplicateCode, UnreachableCode } from '../types';
import { isLowerCase, checkForInvalidSymbols, checkForListErrors } from './validation';

describe('[util]: validation', () => {

  it('[isLowerCase]: helper function', () => {
    expect(isLowerCase('hello123')).toBeTruthy();
    expect(isLowerCase('Hello')).toBeFalsy();
  });

  it('[checkForInvalidSymbols]: empty code', () => {
    const code = new BoxIkCode('');
    const error = checkForInvalidSymbols(code);
    expect(error).toBeDefined();
    expect(error instanceof EmptyCode).toBeTruthy();
  });

  it('[checkForInvalidSymbols]: invalid code', () => {
    let code = new BoxIkCode('NotValidCode');
    let error = checkForInvalidSymbols(code);
    expect(error).toBeDefined();
    expect(error instanceof InvalidSymbolsInCode).toBeTruthy();
  });

  it('[checkForInvalidSymbols]: valid code', () => {
    const code = new BoxIkCode('test ↑→↓←↵');
    const error = checkForInvalidSymbols(code);
    expect(error).toBeNull();
  });

  it('[checkForListErrors]: list with duplicates', () => {
    const list = [
      new BoxIkCode('ac↑b↑ba↓'),
      new BoxIkCode('ac↑b↑ba↓')
    ];
    const errors = checkForListErrors(list);
    expect(errors.length).toEqual(1);
    const error = errors[0];
    expect(error instanceof DuplicateCode).toBeTruthy();
  });

  it('[checkForListErrors]: list with unreachables', () => {
    const list = [
      new BoxIkCode('ac↑b'),
      new BoxIkCode('ac↑b↑ba↓')
    ];
    const errors = checkForListErrors(list);
    expect(errors.length).toEqual(1);
    const error = errors[0];
    expect(error instanceof UnreachableCode).toBeTruthy();
  });

  it('[checkForListErrors]: empty list', () => {
    const list = [];
    const errors = checkForListErrors(list);
    expect(errors).toBeNull();
  });

  it('[checkForListErrors]: list with no errors', () => {
    const list = [
      new BoxIkCode('ac↑b↑ba↓'),
      new BoxIkCode('↑↑↓↓←→←→ba')
    ];
    const errors = checkForListErrors(list);
    expect(errors).toBeNull();
  });
});
