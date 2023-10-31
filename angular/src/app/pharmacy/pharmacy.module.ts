import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddMedicineComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PharmacyModule { }
