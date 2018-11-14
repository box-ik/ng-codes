
import { BoxIkCode } from './box-ik-code';
import { CodeError, EmptyCode, InvalidSymbolsInCode, UnreachableCode, DuplicateCode } from './errors';

describe('[types]: custom errors', () => {

  it('CodeError', () => {
    const error = new CodeError('message');
    const message = error.message;
    expect(message).toEqual('message');
  });

  it('EmptyCode', () => {
    const error = new EmptyCode();
    const message = error.message;
    expect(message).toEqual('Empty code found');
  });

  it('InvalidSymbolsInCode', () => {
    const code = new BoxIkCode('XUUDDLRLRba');
    const error = new InvalidSymbolsInCode(code, ['X']);
    const message = error.message;
    expect(message).toEqual(`Code 'XUUDDLRLRba' has invalid symbols [X]`);
  });

  it('UnreachableCode', () => {
    const code = new BoxIkCode('UUDD');
    const unreachable = new BoxIkCode('UUDDLRLRba');
    const error = new UnreachableCode(unreachable, code);
    const message = error.message;
    expect(message).toEqual(`Code 'UUDDLRLRba' is unreachable because of 'UUDD'`);
  });

  it('DuplicateCode', () => {
    const code = new BoxIkCode('UUDDLRLRba');
    const error = new DuplicateCode(code);
    const message = error.message;
    expect(message).toEqual(`Code 'UUDDLRLRba' has duplicates`);
  });
});
