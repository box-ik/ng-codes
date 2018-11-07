import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BoxIkCheatCodesModule, BoxIkCheatCodesService, BoxIkCheatCode } from '@box-ik/ng-cheat-codes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BoxIkCheatCodesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private cheatCodesService: BoxIkCheatCodesService) {
    this.cheatCodesService.use([
      new BoxIkCheatCode('↑↑↓↓←→←→ba', 'The Konami Code'),
      new BoxIkCheatCode('iddqd', 'DOOM'),
      new BoxIkCheatCode('abacabb', 'Mortal Kombat'),
      new BoxIkCheatCode('^-^', 'Smile'),
      new BoxIkCheatCode('l1r1↑↓←→→←↓↑', 'Twisted Metal 2')
    ]);
  }
}
