
import { BoxIkCheatCode } from './box-ik-cheat-code';

export class CheatCodeError extends Error {

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, CheatCodeError.prototype);
  }

  print() {
    console.warn(this.message);
  }
}

export class EmptyCheatCode extends CheatCodeError {

  constructor() {
    super(`Cheat Code is Empty`);
    Object.setPrototypeOf(this, EmptyCheatCode.prototype);
  }

  print() {
    console.error(this.message);
  }
}

export class InvalidSymbolsInCheatCode extends CheatCodeError {

  constructor(cheatCode: BoxIkCheatCode, invalidSymbols: string[]) {
    super(`Cheat Code '${cheatCode.code}' has invalid symbols [${invalidSymbols.join(', ')}]`);
    Object.setPrototypeOf(this, InvalidSymbolsInCheatCode.prototype);
  }

  print() {
    console.error(this.message);
  }
}


export class UnreachableCheatCode extends CheatCodeError {

  constructor(unreachable: BoxIkCheatCode, reason: BoxIkCheatCode) {
    super(`Cheat Code '${unreachable.code}' is unreachable because of '${reason.code}'`);
    Object.setPrototypeOf(this, UnreachableCheatCode.prototype);
  }
}


export class DuplicateCheatCode extends CheatCodeError {
  
  constructor(cheatCode: BoxIkCheatCode) {
    super(`Cheat Code '${cheatCode.code}' has duplicates`);
    Object.setPrototypeOf(this, DuplicateCheatCode.prototype);
  }
}
