import { NgModule } from '@angular/core';

import { BoxIkNgCodesServiceModule } from './ng-codes-service.module';
import { BoxIkNgCodesService } from './ng-codes.service';

@NgModule({
  imports: [
    BoxIkNgCodesServiceModule
  ],
  declarations: [],
  exports: [],
  providers: [BoxIkNgCodesService]
})
export class BoxIkNgCodesModule { }
