import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const formsModule = [
  FormsModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, ...formsModule
  ],
  exports: formsModule
})
export class OwnFormsModule { }
