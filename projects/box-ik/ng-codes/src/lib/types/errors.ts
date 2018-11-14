
import { BoxIkCode } from './box-ik-code';

export class CodeError extends Error {
  code: BoxIkCode;
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, CodeError.prototype);
  }
}

export class EmptyCode extends CodeError {

  constructor() {
    super(`Empty code found`);
    Object.setPrototypeOf(this, EmptyCode.prototype);
  }
}

export class InvalidSymbolsInCode extends CodeError {

  constructor(code: BoxIkCode, invalidSymbols: string[]) {
    super(`Code '${code.value}' has invalid symbols [${invalidSymbols.join(', ')}]`);
    Object.setPrototypeOf(this, InvalidSymbolsInCode.prototype);
    this.code = code;
  }
}


export class UnreachableCode extends CodeError {

  constructor(unreachable: BoxIkCode, reason: BoxIkCode) {
    super(`Code '${unreachable.value}' is unreachable because of '${reason.value}'`);
    Object.setPrototypeOf(this, UnreachableCode.prototype);
    this.code = unreachable;
  }
}


export class DuplicateCode extends CodeError {
  
  constructor(code: BoxIkCode) {
    super(`Code '${code.value}' has duplicates`);
    Object.setPrototypeOf(this, DuplicateCode.prototype);
    this.code = code;
  }
}
