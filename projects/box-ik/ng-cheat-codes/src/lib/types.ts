
export type BoxIkCheatCode = [string, any?];

export class CheatCodeError extends Error {
  print() {
    console.warn(this.message);
  }
}

export class CheatCodeSymbolsError extends CheatCodeError {
  constructor(cheatCode: BoxIkCheatCode, symbols: string[]) {
    super(`Cheat Code '${cheatCode[0]}' has invalid symbols '${symbols.join(', ')}'`);
  }
  print() {
    console.error(this.message);
  }
}

export class CheatCodeUnreachableError extends CheatCodeError {
  constructor(cheatCode: BoxIkCheatCode, unreachable: BoxIkCheatCode) {
    super(`Cheat Code '${unreachable[0]}' is unreachable because of '${cheatCode[0]}'`);
  }
}

export class CheatCodeDuplicateError extends CheatCodeError {
  constructor(cheatCode: BoxIkCheatCode) {
    super(`Cheat Code '${cheatCode[0]}' duplicate`);
  }
}
