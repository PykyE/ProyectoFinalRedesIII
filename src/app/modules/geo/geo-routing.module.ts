import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeoComponent } from './geo/geo.component';

const routes: Routes = [
  {
    path: '',
    component: GeoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeoRoutingModule { }
