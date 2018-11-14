import { Component } from '@angular/core';
import { BoxIkNgCodesService, BoxIkCode } from '@box-ik/ng-codes';
import { KeyListener } from '../../projects/box-ik/ng-codes/src/lib/key-listener';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activated: BoxIkCode[] = [];

  keyListener = new KeyListener();
  keys: string = '';
  focused: string = '';

  constructor(public ngCodesService: BoxIkNgCodesService) {
    this.ngCodesService.code.subscribe((code: BoxIkCode) => {
      this.activated.push(code);
    });

    this.keyListener.observable().subscribe(key => {
      this.keys += key; 
    })
  }

  onClear() {
    this.keys = '';
  }

  onFocus($event) {
    this.focused = $event.target.tagName;
  }

  onBlur() {
    this.focused = '';
  }
}
