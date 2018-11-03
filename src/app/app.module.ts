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
    this.cheatCodesService.useCheatCodes([
      new BoxIkCheatCode('acUbUbaD', 'logner cheat code'),
      new BoxIkCheatCode('UbaD', 'small cheat code')
    ]);

    this.cheatCodesService.cheatCode.subscribe(cheat => {
      console.log(cheat.description);
    });
  }
}
