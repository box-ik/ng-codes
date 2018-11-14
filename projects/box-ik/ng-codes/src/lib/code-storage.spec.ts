
import { CodeStorage } from './code-storage';
import { BoxIkCode, EmptyCode, InvalidSymbolsInCode, UnreachableCode, DuplicateCode } from './types';

describe('CodeStorage', () => {

  it('initialization', () => {
    const storage = new CodeStorage();
    expect(storage.codes.length).toEqual(0);
  });

  it('add valid codes', () => {
    const storage = new CodeStorage();
    const errors = storage.add([
      new BoxIkCode('↑↑↓↓←→←→ba'),
      new BoxIkCode('ac↑b↑ba↓'),
    ]);

    expect(errors).toBeNull();
    expect(storage.codes[0].value).toEqual('ac↑b↑ba↓');
    expect(storage.codes[1].value).toEqual('↑↑↓↓←→←→ba');
  });

  it('add empty code', () => {
    const storage = new CodeStorage();
    const errors = storage.add([
      new BoxIkCode('')
    ]);
    expect(Array.isArray(errors)).toBeTruthy();
    expect(errors.length).toEqual(1);
    expect(errors[0] instanceof EmptyCode).toBeTruthy();
  });

  it('add invalid code', () => {
    const storage = new CodeStorage();
    const errors = storage.add([
      new BoxIkCode('HELLO')
    ]);
    expect(Array.isArray(errors)).toBeTruthy();
    expect(errors.length).toEqual(1);
    expect(errors[0] instanceof InvalidSymbolsInCode).toBeTruthy();
  });

  it('add duplicate', () => {
    const storage = new CodeStorage();
    const errors = storage.add([
      new BoxIkCode('ac↑b↑ba↓'),
      new BoxIkCode('ac↑b↑ba↓'),
    ]);
    expect(Array.isArray(errors)).toBeTruthy();
    expect(errors.length).toEqual(1);
    expect(errors[0] instanceof DuplicateCode).toBeTruthy();

    expect(storage.codes.length).toEqual(1);
  });

  it('add unreachable code', () => {
    const storage = new CodeStorage();
    storage.add([new BoxIkCode('↑↑↓↓←→←→ba')]);
    const errors = storage.add([
      new BoxIkCode('↑↑↓↓')
    ]);
    expect(Array.isArray(errors)).toBeTruthy();
    expect(errors.length).toEqual(1);
    expect(errors[0] instanceof UnreachableCode).toBeTruthy();

    expect(storage.codes.length).toEqual(1);
  });

  it('clear', () => {
    const storage = new CodeStorage();
    storage.add([new BoxIkCode('↑↑↓↓←→←→ba')]);
    storage.clear();
    expect(storage.codes.length).toEqual(0);
  });
});