import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [
    MaterialModule,
    FormsModule
  ],
  declarations: [ ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class SharedModule { }
