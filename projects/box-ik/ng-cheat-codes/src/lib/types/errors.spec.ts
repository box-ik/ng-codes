
import { BoxIkCheatCode } from './box-ik-cheat-code';
import { CheatCodeError, EmptyCheatCode, InvalidSymbolsInCheatCode, UnreachableCheatCode, DuplicateCheatCode } from './errors';

describe('[types]: custom errors', () => {

  let original = [console.warn, console.error];
  let warnSpy;
  let errorSpy;

  beforeAll(() => {
    warnSpy = spyOn(console, "warn");
    errorSpy = spyOn(console, "error");
  });

  afterAll(() => {
    console.warn = original[0];
    console.error = original[1];
  });

  afterEach(() => {
    warnSpy.calls.reset();
    errorSpy.calls.reset();
  });

  it('CheatCodeError', () => {
    const error = new CheatCodeError('message');
    error.print();
    const message = error.message;
    expect(message).toEqual('message');
    expect(warnSpy).toHaveBeenCalledWith(message);
  });

  it('EmptyCheatCode', () => {
    const error = new EmptyCheatCode();
    error.print();
    const message = error.message;
    expect(message).toEqual('Cheat Code is Empty');
    expect(errorSpy).toHaveBeenCalledWith(message);
  });

  it('InvalidSymbolsInCheatCode', () => {
    const code = new BoxIkCheatCode('XUUDDLRLRba');
    const error = new InvalidSymbolsInCheatCode(code, ['X']);
    error.print();
    const message = error.message;
    expect(message).toEqual(`Cheat Code 'XUUDDLRLRba' has invalid symbols [X]`);
    expect(errorSpy).toHaveBeenCalledWith(message);
  });

  it('UnreachableCheatCode', () => {
    const code = new BoxIkCheatCode('UUDD');
    const unreachable = new BoxIkCheatCode('UUDDLRLRba');
    const error = new UnreachableCheatCode(unreachable, code);
    error.print();
    const message = error.message;
    expect(message).toEqual(`Cheat Code 'UUDDLRLRba' is unreachable because of 'UUDD'`);
    expect(warnSpy).toHaveBeenCalledWith(message);
  });

  it('DuplicateCheatCode', () => {
    const code = new BoxIkCheatCode('UUDDLRLRba');
    const error = new DuplicateCheatCode(code);
    error.print();
    const message = error.message;
    expect(message).toEqual(`Cheat Code 'UUDDLRLRba' has duplicates`);
    expect(warnSpy).toHaveBeenCalledWith(message);
  });
});
