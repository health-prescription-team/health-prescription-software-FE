import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorComponent } from './doctor/doctor.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DoctorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DoctorModule { }
