import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-medicament',
  templateUrl: './add-medicament.component.html',
  styleUrls: ['./add-medicament.component.css']
})
export class AddMedicamentComponent {
  addMedicament(form:NgForm){
    const {
      name,
      price,
      medicinePicture,
      companyCreated
    } = form.value;
    console.log(form.value);
    form.reset();

  }
}
