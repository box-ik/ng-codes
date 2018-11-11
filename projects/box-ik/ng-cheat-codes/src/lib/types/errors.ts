
import { BoxIkCheatCode } from './box-ik-cheat-code';

export class CheatCodeError extends Error {
  invalidCheatCode: BoxIkCheatCode;
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, CheatCodeError.prototype);
  }
}

export class EmptyCheatCode extends CheatCodeError {

  constructor() {
    super(`Empty cheat code found`);
    Object.setPrototypeOf(this, EmptyCheatCode.prototype);
  }
}

export class InvalidSymbolsInCheatCode extends CheatCodeError {

  constructor(cheatCode: BoxIkCheatCode, invalidSymbols: string[]) {
    super(`Cheat code '${cheatCode.code}' has invalid symbols [${invalidSymbols.join(', ')}]`);
    Object.setPrototypeOf(this, InvalidSymbolsInCheatCode.prototype);
    this.invalidCheatCode = cheatCode;
  }
}


export class UnreachableCheatCode extends CheatCodeError {

  constructor(unreachable: BoxIkCheatCode, reason: BoxIkCheatCode) {
    super(`Cheat code '${unreachable.code}' is unreachable because of '${reason.code}'`);
    Object.setPrototypeOf(this, UnreachableCheatCode.prototype);
    this.invalidCheatCode = unreachable;
  }
}


export class DuplicateCheatCode extends CheatCodeError {
  
  constructor(cheatCode: BoxIkCheatCode) {
    super(`Cheat code '${cheatCode.code}' has duplicates`);
    Object.setPrototypeOf(this, DuplicateCheatCode.prototype);
    this.invalidCheatCode = cheatCode;
  }
}
