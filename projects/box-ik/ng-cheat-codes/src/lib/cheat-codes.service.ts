import { Injectable, OnDestroy } from '@angular/core';
import { KeyListener } from './key-listener';

@Injectable({
  providedIn: 'root'
})
export class BoxIkCheatCodesService implements OnDestroy {

  keyListener: KeyListener;

  constructor() {
    this.keyListener = new KeyListener();
    this.keyListener.observable().subscribe(this.onKey);
  }

  ngOnDestroy() {
    this.keyListener.destroy();
  }

  onKey(key: string) {
    console.log(key);
  }
}
