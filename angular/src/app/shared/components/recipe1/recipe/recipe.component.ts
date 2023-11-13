import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CacheService } from 'src/app/shared/services/cache.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit,OnChanges {
  recipeId: string = "";
  inputselectMedInput: string = '';

  date = new Date();
  options: any = { day: 'numeric', month: 'numeric', year: 'numeric' };
  formattedDate = this.date.toLocaleDateString(undefined, this.options);

  constructor(
    private service: UserService,
    public CacheService: CacheService,
  ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.service.jwtdecrypt(token!);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("change")
  }


  recipeInfo(form: NgForm) {
    //POST
    const { patient, patientАge, diagnosis } = form.value;
    const allFields = { ...form.value, ...this.CacheService.nestedFormValues, "startDate":this.formattedDate };
    console.log(allFields)
    // console.log(patient, patientАge, diagnosis);
    if (!this.recipeId) {
      // response => ID
      const formData = new FormData()
      formData.append("diagnosis",allFields.diagnosis)
      formData.append("doctor",allFields.doctor)
      formData.append("patient",allFields.patient)
      //this.rescipeID = response.ID;
    } else {
      //put new medicine
      const { med, morning, midday, evening, additionalInfo } = allFields;
      // console.log(allFields);
      //PUT med, morning, midday, evening, additionalInfo
      // console.log(med, morning, midday, evening, additionalInfo);
    }
    // console.log('-->',selectMedInput);
  }

  medicinesInfo(form: NgForm) {
    const {} = form.value;
    const medicines = { ...form.value, ...this.CacheService.nestedFormValues};
    console.log('medicines', medicines);
  }
}
