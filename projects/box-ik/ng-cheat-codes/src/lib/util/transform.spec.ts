
import { normalizeKey, sortCheatCodes } from './transform';
import { BoxIkCheatCode } from '../types';

describe('[util]: transform', () => {

  it('[normalizeKey]', () => {
    // special
    const specialOriginal = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Enter', 'Spacebar'];
    const specialNormalized = ['U', 'R', 'D', 'L', 'E', 'S'];
    for(let i = 0; i < specialOriginal.length; ++i) {
      const original = specialOriginal[i];
      const normalized = specialNormalized[i];
      expect(normalizeKey(original)).toEqual(normalized);
    }
    // all
    expect(normalizeKey('K')).toEqual('k');
    expect(normalizeKey('k')).toEqual('k');
  });

  it('[sortCheatCodes]', () => {
    const list = [
      new BoxIkCheatCode('middle'),
      new BoxIkCheatCode('sh'),
      new BoxIkCheatCode('longcheatcode')
    ];
    const sorted = sortCheatCodes(list);
    expect(sorted[0].code).toEqual('sh');
    expect(sorted[1].code).toEqual('middle');
    expect(sorted[2].code).toEqual('longcheatcode');
  });
});
