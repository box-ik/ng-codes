
import { BoxIkCheatCode } from './box-ik-cheat-code';
import { CheatCodeError, EmptyCheatCode, InvalidSymbolsInCheatCode, UnreachableCheatCode, DuplicateCheatCode } from './errors';

describe('[types]: custom errors', () => {

  it('CheatCodeError', () => {
    const error = new CheatCodeError('message');
    const message = error.message;
    expect(message).toEqual('message');
  });

  it('EmptyCheatCode', () => {
    const error = new EmptyCheatCode();
    const message = error.message;
    expect(message).toEqual('Empty cheat code found');
  });

  it('InvalidSymbolsInCheatCode', () => {
    const code = new BoxIkCheatCode('XUUDDLRLRba');
    const error = new InvalidSymbolsInCheatCode(code, ['X']);
    const message = error.message;
    expect(message).toEqual(`Cheat code 'XUUDDLRLRba' has invalid symbols [X]`);
  });

  it('UnreachableCheatCode', () => {
    const code = new BoxIkCheatCode('UUDD');
    const unreachable = new BoxIkCheatCode('UUDDLRLRba');
    const error = new UnreachableCheatCode(unreachable, code);
    const message = error.message;
    expect(message).toEqual(`Cheat code 'UUDDLRLRba' is unreachable because of 'UUDD'`);
  });

  it('DuplicateCheatCode', () => {
    const code = new BoxIkCheatCode('UUDDLRLRba');
    const error = new DuplicateCheatCode(code);
    const message = error.message;
    expect(message).toEqual(`Cheat code 'UUDDLRLRba' has duplicates`);
  });
});
