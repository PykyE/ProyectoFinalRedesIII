import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

const materialModule = [
  MatSnackBarModule,
  MatDialogModule,
  MatCardModule,
  MatDividerModule,
  MatProgressBarModule,
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatChipsModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, ...materialModule
  ],
  exports: materialModule
})
export class MaterialModule { }
