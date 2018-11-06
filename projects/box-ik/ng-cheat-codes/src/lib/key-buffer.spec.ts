
import { KeyBuffer } from './key-buffer';
import { BoxIkCheatCode } from './types';
import { CIRCULAR } from '@angular/core/src/render3/instructions';

describe('KeyBuffer', () => {

  it('initialization', () => {
    const keyBuffer = new KeyBuffer();
    expect(keyBuffer.buffer).toEqual('');
    expect(keyBuffer.autoResetTime).toEqual(1000);
  });

  it('append', (done) => {
    const keyBuffer = new KeyBuffer();

    // append in time limit
    keyBuffer.append('q');
    keyBuffer.append('w');
    keyBuffer.append('e');
    expect(keyBuffer.buffer).toEqual('qwe');
    
    // append after time limit
    keyBuffer.autoResetTime = 10;
    setTimeout(() => {
      keyBuffer.append('r');
      keyBuffer.append('t');
      expect(keyBuffer.buffer).toEqual('rt');
      done();
    }, 11);
  });

  it('reset', () => {
    const keyBuffer = new KeyBuffer();
    keyBuffer.append('q');
    expect(keyBuffer.buffer).toEqual('q');
    keyBuffer.reset();
    expect(keyBuffer.buffer).toEqual('');
  });

  it('match', () => {
    const keyBuffer = new KeyBuffer();
    const list = [
      new BoxIkCheatCode('baD'),
      new BoxIkCheatCode('acUbUbaD'),
    ];

    // suffix
    for(let key of 'UbaD') {
      keyBuffer.append(key);
    }
    let code = keyBuffer.match(list);
    expect(code.code).toEqual('baD');
    expect(keyBuffer.buffer).toEqual('');

    // longers suffix
    for(let key of 'acUbUbaD') {
      keyBuffer.append(key);
    }
    code = keyBuffer.match(list);
    expect(code.code).toEqual('acUbUbaD');
    expect(keyBuffer.buffer).toEqual('');

    // no match
    for(let key of 'hello') {
      keyBuffer.append(key);
    }
    code = keyBuffer.match(list);
    expect(code).toBeNull();
  });
});