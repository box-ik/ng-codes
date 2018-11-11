import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { KeyListener } from './key-listener';
import { KeyBuffer } from './key-buffer';
import { CheatCodeStorage } from './cheat-code-storage';
import { BoxIkCheatCode, CheatCodeError } from './types';

@Injectable({
  providedIn: 'root'
})
export class BoxIkCheatCodesService implements OnDestroy {

  public use(cheatCodes: BoxIkCheatCode[]): CheatCodeError[] | null {
    return this.storage.add(cheatCodes);
  }

  public list(): BoxIkCheatCode[] {
    return this.storage.cheatCodes;
  }

  public removeAll(): void {
    this.storage.clear();
  }

  public get cheatCode(): Observable<BoxIkCheatCode> {
    return this.match$.asObservable();
  }

  public get paused(): boolean {
    return this.keyListener.paused
  }
  public set paused(value: boolean) {
    this.keyListener.paused = value;
  }

  public get resetInterval(): number {
    return this.keyBuffer.resetInterval;
  }
  public set resetInterval(value: number) {
    this.keyBuffer.resetInterval = value;
  }

  constructor() {
    this.storage = new CheatCodeStorage();
    this.keyListener = new KeyListener();
    this.keyBuffer = new KeyBuffer();
    this.keyListener.observable().subscribe(this.onKey.bind(this));
  }

  private storage: CheatCodeStorage;
  private keyListener: KeyListener;
  private keyBuffer: KeyBuffer;
  private match$: Subject<BoxIkCheatCode> = new Subject();

  ngOnDestroy() {
    this.keyListener.destroy();
  }

  private onKey(key: string) {
    this.keyBuffer.append(key);
    const match = this.keyBuffer.match(this.storage.cheatCodes);
    if (match) {
      this.match$.next(match);
    }
  }
}
