import { Injectable, OnDestroy } from '@angular/core';
import { KeyListener } from './key-listener';
import { Observable, Subject } from 'rxjs';
import { BoxIkCheatCode } from './types';
import { KeyBuffer } from './key-buffer';

@Injectable({
  providedIn: 'root'
})
export class BoxIkCheatCodesService implements OnDestroy {

  public addCode(code: BoxIkCheatCode) {
    this.cheatCodes.push(code);
  }

  public removeAllCodes() {
    this.cheatCodes = [];
  }

  public cheatCode(): Observable<BoxIkCheatCode> {
    return this.match$.asObservable();
  }

  constructor() {
    this.keyListener = new KeyListener();
    this.keyBuffer = new KeyBuffer();
    this.keyListener.observable().subscribe(this.onKey.bind(this));
  }

  private cheatCodes: BoxIkCheatCode[] = [];
  private keyListener: KeyListener;
  private keyBuffer: KeyBuffer;
  private match$: Subject<BoxIkCheatCode> = new Subject();

  ngOnDestroy() {
    this.keyListener.destroy();
  }

  private onKey(key: string) {
    this.keyBuffer.append(key);
    const match = this.keyBuffer.match(this.cheatCodes);
    if (match) {
      this.match$.next(match);
    }
  }
}
