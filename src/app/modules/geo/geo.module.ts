import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoComponent } from './geo/geo.component';
import { GeoRoutingModule } from './geo-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OwnFormsModule } from '../shared/forms/forms.module';

@NgModule({
  declarations: [
    GeoComponent
  ],
  imports: [
    CommonModule,
    GeoRoutingModule,
    SharedModule,
    OwnFormsModule
  ]
})
export class GeoModule { }
