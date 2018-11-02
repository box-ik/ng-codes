import { BoxIkCheatCode } from "./types";

export class KeyBuffer {

  autoResetTime = 1000;

  append(key: string) {

    const time = Date.now();
    if (time - this.timestamp > this.autoResetTime) {
      this.reset();
    }
    this.timestamp = time;
    this.buffer += key;
  }

  reset() {
    this.buffer = '';
  }

  match(cheatCodes: BoxIkCheatCode[]): BoxIkCheatCode | null {
    for(let cheatCode of cheatCodes) {
      if (this.buffer.includes(cheatCode[0])) {
        this.reset();
        return cheatCode;
      }
    }
  }

  private buffer = '';

  private timestamp = 0;
}