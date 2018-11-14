import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { BoxIkNgCodesModule, BoxIkNgCodesService, BoxIkCode } from '@box-ik/ng-codes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BoxIkNgCodesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngCodesService: BoxIkNgCodesService) {
    this.ngCodesService.use([
      new BoxIkCode('↑↑↓↓←→←→ba', 'The Konami Code'),
      new BoxIkCode('iddqd', 'DOOM: God Mode'),
      new BoxIkCode('abacabb', 'Mortal Kombat: Blood Code')
    ]);
  }
}
