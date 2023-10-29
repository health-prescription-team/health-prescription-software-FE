import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient/patient.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';




@NgModule({
  declarations: [
    PatientComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PatientModule { }
