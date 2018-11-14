
import { normalizeKey, sortCodes } from './transform';
import { BoxIkCode } from '../types';

describe('[util]: transform', () => {

  it('[normalizeKey]', () => {
    // special
    const specialOriginal = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Enter', 'Spacebar'];
    const specialNormalized = ['↑', '→', '↓', '←', '↵', ' '];
    for(let i = 0; i < specialOriginal.length; ++i) {
      const original = specialOriginal[i];
      const normalized = specialNormalized[i];
      expect(normalizeKey(original)).toEqual(normalized);
    }
    // all
    expect(normalizeKey('K')).toEqual('k');
    expect(normalizeKey('k')).toEqual('k');
  });

  it('[sortCodes]', () => {
    const list = [
      new BoxIkCode('middle'),
      new BoxIkCode('sh'),
      new BoxIkCode('longcode')
    ];
    const sorted = sortCodes(list);
    expect(sorted[0].value).toEqual('sh');
    expect(sorted[1].value).toEqual('middle');
    expect(sorted[2].value).toEqual('longcode');
  });
});
