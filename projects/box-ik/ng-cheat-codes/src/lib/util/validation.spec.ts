
import { BoxIkCheatCode, EmptyCheatCode, InvalidSymbolsInCheatCode, DuplicateCheatCode, UnreachableCheatCode } from '../types';
import { isLowerCase, checkForInvalidSymbols, checkForListErrors } from './validation';

describe('[util]: validation', () => {

  it('[isLowerCase]: helper function', () => {
    expect(isLowerCase('hello123')).toBeTruthy();
    expect(isLowerCase('Hello')).toBeFalsy();
  });

  it('[checkForInvalidSymbols]: empty code', () => {
    const code = new BoxIkCheatCode('');
    const error = checkForInvalidSymbols(code);
    expect(error).toBeDefined();
    expect(error instanceof EmptyCheatCode).toBeTruthy();
  });

  it('[checkForInvalidSymbols]: invalid code', () => {
    let code = new BoxIkCheatCode('NotValidCheatCode');
    let error = checkForInvalidSymbols(code);
    expect(error).toBeDefined();
    expect(error instanceof InvalidSymbolsInCheatCode).toBeTruthy();
  });

  it('[checkForInvalidSymbols]: valid code', () => {
    const code = new BoxIkCheatCode('test ↑→↓←↵');
    const error = checkForInvalidSymbols(code);
    expect(error).toBeNull();
  });

  it('[checkForListErrors]: list with duplicates', () => {
    const list = [
      new BoxIkCheatCode('ac↑b↑ba↓'),
      new BoxIkCheatCode('ac↑b↑ba↓')
    ];
    const errors = checkForListErrors(list);
    expect(errors.length).toEqual(1);
    const error = errors[0];
    expect(error instanceof DuplicateCheatCode).toBeTruthy();
  });

  it('[checkForListErrors]: list with unreachables', () => {
    const list = [
      new BoxIkCheatCode('ac↑b'),
      new BoxIkCheatCode('ac↑b↑ba↓')
    ];
    const errors = checkForListErrors(list);
    expect(errors.length).toEqual(1);
    const error = errors[0];
    expect(error instanceof UnreachableCheatCode).toBeTruthy();
  });

  it('[checkForListErrors]: empty list', () => {
    const list = [];
    const errors = checkForListErrors(list);
    expect(errors).toBeNull();
  });

  it('[checkForListErrors]: list with no errors', () => {
    const list = [
      new BoxIkCheatCode('ac↑b↑ba↓'),
      new BoxIkCheatCode('↑↑↓↓←→←→ba')
    ];
    const errors = checkForListErrors(list);
    expect(errors).toBeNull();
  });
});
