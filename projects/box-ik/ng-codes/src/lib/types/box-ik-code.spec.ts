
import { BoxIkCode } from './box-ik-code';

describe('[types]: BoxIkCode', () => {

  it('initialization with description', () => {
    const code = new BoxIkCode('UUDDLRLRba', 'The Konami Code');
    expect(code.value).toEqual('UUDDLRLRba');
    expect(code.description).toEqual('The Konami Code');
  });

  it('initialization without description', () => {
    const code = new BoxIkCode('UUDDLRLRba');
    expect(code.value).toEqual('UUDDLRLRba');
    expect(code.description).toBeNull();
  });
});
