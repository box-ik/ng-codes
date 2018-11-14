import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { KeyListener } from './key-listener';
import { KeyBuffer } from './key-buffer';
import { CodeStorage } from './code-storage';
import { BoxIkCode, CodeError } from './types';

@Injectable({
  providedIn: 'root'
})
export class BoxIkNgCodesService implements OnDestroy {

  public use(codes: BoxIkCode[]): CodeError[] | null {
    return this.storage.add(codes);
  }

  public list(): BoxIkCode[] {
    return this.storage.codes;
  }

  public removeAll(): void {
    this.storage.clear();
  }

  public get code(): Observable<BoxIkCode> {
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
    this.storage = new CodeStorage();
    this.keyListener = new KeyListener();
    this.keyBuffer = new KeyBuffer();
    this.keyListener.observable().subscribe(this.onKey.bind(this));
  }

  private storage: CodeStorage;
  private keyListener: KeyListener;
  private keyBuffer: KeyBuffer;
  private match$: Subject<BoxIkCode> = new Subject();

  ngOnDestroy() {
    this.keyListener.destroy();
  }

  private onKey(key: string) {
    this.keyBuffer.append(key);
    const match = this.keyBuffer.match(this.storage.codes);
    if (match) {
      this.match$.next(match);
    }
  }
}
