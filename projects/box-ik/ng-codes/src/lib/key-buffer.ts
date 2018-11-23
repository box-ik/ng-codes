import { Injectable } from '@angular/core';
import { BoxIkNgCodesServiceModule } from './ng-codes-service.module';
import { BoxIkCode } from "./types";

@Injectable({
  providedIn: BoxIkNgCodesServiceModule
})
export class KeyBuffer {

  resetInterval = 1000;

  append(key: string) {

    const time = Date.now();
    if (time - this.timestamp > this.resetInterval) {
      this.reset();
    }
    this.timestamp = time;
    this._buffer += key;
  }

  reset() {
    this._buffer = '';
  }

  match(codes: BoxIkCode[]): BoxIkCode | null {
    for(let i = codes.length - 1; i >= 0; --i) {
      const code = codes[i];
      if (this._buffer.includes(code.value)) {
        this.reset();
        return code;
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