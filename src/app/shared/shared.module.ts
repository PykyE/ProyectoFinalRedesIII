import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { NgprimeModule } from './ngprime/ngprime.module';

@NgModule({
  exports: [
    MaterialModule,
    NgprimeModule,
    FormsModule
  ],
  declarations: [ ],
  imports: [
    CommonModule,
    MaterialModule,
    NgprimeModule,
    FormsModule
  ]
})
export class SharedModule { }
