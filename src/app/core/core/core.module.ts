import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    MatButtonModule,
    MatProgressBarModule,
    MatRadioModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ]
})
export class CoreModule { }
