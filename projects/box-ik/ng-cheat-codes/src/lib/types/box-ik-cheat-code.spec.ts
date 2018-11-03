
import { BoxIkCheatCode } from './box-ik-cheat-code';

describe('[types]: BoxIkCheatCode', () => {

  it('initialization with description', () => {
    const code = new BoxIkCheatCode('UUDDLRLRba', 'The Konami Code');
    expect(code.code).toEqual('UUDDLRLRba');
    expect(code.description).toEqual('The Konami Code');
  });

  it('initialization without description', () => {
    const code = new BoxIkCheatCode('UUDDLRLRba');
    expect(code.code).toEqual('UUDDLRLRba');
    expect(code.description).toBeNull();
  });
});
