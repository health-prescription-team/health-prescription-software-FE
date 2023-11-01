import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PharmacyService } from '../services/pharmacy.service';
@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent {
constructor(private pharmacyService:PharmacyService) {}

addMedicine(form:NgForm){
  if(form.invalid) return
  console.log(form.value);
  
  this.pharmacyService.addMeidicine(form.value).subscribe({
    next:(res:any) => {
      console.log(res);
    },
    error(err) {
      console.log(err);
      
    }
  })
  form.reset();
}
}
