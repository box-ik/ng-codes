import { BoxIkCheatCode } from "./types";

export class KeyBuffer {

  autoResetTime = 1000;

  append(key: string) {

    const time = Date.now();
    if (time - this.timestamp > this.autoResetTime) {
      this.reset();
    }
    this.timestamp = time;
    this._buffer += key;
  }

  reset() {
    this._buffer = '';
  }

  match(cheatCodes: BoxIkCheatCode[]): BoxIkCheatCode | null {
    for(let i = cheatCodes.length - 1; i >= 0; --i) {
      const cheatCode = cheatCodes[i];
      if (this._buffer.includes(cheatCode.code)) {
        this.reset();
        return cheatCode;
      }
    }
    return null;
  }

  get buffer(): string {
    return this._buffer;
  }

  private _buffer = '';

  private timestamp = 0;
}