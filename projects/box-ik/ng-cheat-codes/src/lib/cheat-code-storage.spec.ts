
import { CheatCodeStorage } from './cheat-code-storage';
import { BoxIkCheatCode, EmptyCheatCode, InvalidSymbolsInCheatCode, UnreachableCheatCode, DuplicateCheatCode } from './types';

describe('CheatCodeStorage', () => {

  it('initialization', () => {
    const storage = new CheatCodeStorage();
    expect(storage.cheatCodes.length).toEqual(0);
  });

  it('add valid codes', () => {
    const storage = new CheatCodeStorage();
    const errors = storage.add([
      new BoxIkCheatCode('UUDDLRLRba'),
      new BoxIkCheatCode('acUbUbaD'),
    ]);
    expect(errors).toBeNull();
    expect(storage.cheatCodes[0].code).toEqual('acUbUbaD');
    expect(storage.cheatCodes[1].code).toEqual('UUDDLRLRba');
  });

  it('add empty code', () => {
    const storage = new CheatCodeStorage();
    const errors = storage.add([
      new BoxIkCheatCode('')
    ]);
    expect(Array.isArray(errors)).toBeTruthy();
    expect(errors.length).toEqual(1);
    expect(errors[0] instanceof EmptyCheatCode).toBeTruthy();
  });

  it('add invalid code', () => {
    const storage = new CheatCodeStorage();
    const errors = storage.add([
      new BoxIkCheatCode('HELLO')
    ]);
    expect(Array.isArray(errors)).toBeTruthy();
    expect(errors.length).toEqual(1);
    expect(errors[0] instanceof InvalidSymbolsInCheatCode).toBeTruthy();
  });

  it('add duplicate', () => {
    const storage = new CheatCodeStorage();
    const errors = storage.add([
      new BoxIkCheatCode('UUDDLRLRba'),
      new BoxIkCheatCode('UUDDLRLRba'),
    ]);
    expect(Array.isArray(errors)).toBeTruthy();
    expect(errors.length).toEqual(1);
    expect(errors[0] instanceof DuplicateCheatCode).toBeTruthy();

    expect(storage.cheatCodes.length).toEqual(1);
  });

  it('add unreachable code', () => {
    const storage = new CheatCodeStorage();
    storage.add([new BoxIkCheatCode('UUDDLRLRba')]);
    const errors = storage.add([
      new BoxIkCheatCode('UUDD')
    ]);
    expect(Array.isArray(errors)).toBeTruthy();
    expect(errors.length).toEqual(1);
    expect(errors[0] instanceof UnreachableCheatCode).toBeTruthy();

    expect(storage.cheatCodes.length).toEqual(1);
  });

  it('clear', () => {
    const storage = new CheatCodeStorage();
    storage.add([new BoxIkCheatCode('UUDDLRLRba')]);
    storage.clear();
    expect(storage.cheatCodes.length).toEqual(0);
  });
});