import { Component } from '@angular/core';
import { BoxIkCheatCodesService, BoxIkCheatCode } from '@box-ik/ng-cheat-codes';
import { KeyListener } from '../../projects/box-ik/ng-cheat-codes/src/lib/key-listener';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activated: BoxIkCheatCode[] = [];

  keyListener = new KeyListener();
  keys: string = '';

  constructor(public cheatCodesService: BoxIkCheatCodesService) {
    this.cheatCodesService.cheatCode.subscribe((cheatCode: BoxIkCheatCode) => {
      this.activated.push(cheatCode);
    });

    this.keyListener.observable().subscribe(key => {
      this.keys += key; 
    })
  }

  onClear() {
    this.keys = '';
  }
}
