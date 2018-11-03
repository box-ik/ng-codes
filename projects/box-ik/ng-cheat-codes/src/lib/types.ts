
export class BoxIkCheatCode {
  code: string;
  description?: string;

  constructor(code: string, description?: string) {
    this.code = code;
    this.description = description;
  }
}

export class CheatCodeError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, CheatCodeError.prototype);
  }
  print() {
    console.warn(this.message);
  }
}

export class CheatCodeSymbolsError extends CheatCodeError {
  constructor(cheatCode: BoxIkCheatCode, symbols: string[]) {
    super(`Cheat Code '${cheatCode.code}' has invalid symbols '${symbols.join(', ')}'`);
    Object.setPrototypeOf(this, CheatCodeSymbolsError.prototype);
  }
  print() {
    console.error(this.message);
  }
}

export class CheatCodeUnreachableError extends CheatCodeError {
  constructor(cheatCode: BoxIkCheatCode, unreachable: BoxIkCheatCode) {
    super(`Cheat Code '${unreachable.code}' is unreachable because of '${cheatCode.code}'`);
  }
}

export class CheatCodeDuplicateError extends CheatCodeError {
  constructor(cheatCode: BoxIkCheatCode) {
    super(`Cheat Code '${cheatCode.code}' duplicate`);
  }
}
