import { Injectable, OnDestroy } from '@angular/core';
import { KeyListener } from './key-listener';
import { Observable, Subject } from 'rxjs';
import { BoxIkCheatCode } from './types';
import { KeyBuffer } from './key-buffer';
import { CheatCodeStorage } from './cheat-code-storage';

@Injectable({
  providedIn: 'root'
})
export class BoxIkCheatCodesService implements OnDestroy {

  public useCheatCodes(codes: BoxIkCheatCode[]) {
    let errors = this.storage.addList(codes);
    if (errors) {
      errors.forEach(error => {
        error.print();
      });
    }
  }

  public removeAllCodes() {
    this.storage.clear();
  }

  get cheatCode(): Observable<BoxIkCheatCode> {
    return this.match$.asObservable();
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
