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

  getFormData(formValue:any){
    const formData = new FormData()

    const array = Object.entries(formValue)
    for (const arrayElement of array) {
      // @ts-ignore
      formData.append(arrayElement[0],arrayElement[1])

    }

    return formData
  }

  imageBinary:any

  handleFileInput(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const blob = new Blob([e.target.result], { type: file.type });
        this.imageBinary = blob
      };

      reader.readAsArrayBuffer(file);
    }
  }

addMedicine(form:NgForm){
  //add company name
  if(form.invalid) return
  const payload = this.getFormData(form.value)
  payload.forEach(el=>console.log(el))
  payload.delete("MedicineFile")
  payload.append("MedicineFile",this.imageBinary)
  payload.append("MedicineCompany","ddd")


  this.pharmacyService.addMeidicine(payload).subscribe({
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
