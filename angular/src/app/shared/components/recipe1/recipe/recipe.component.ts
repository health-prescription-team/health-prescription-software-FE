import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  nestedFormValues={}
recipeInfo(form:NgForm){
  const {patient, patientАge, doctor, diagnosis, selectMedInput, morning, midday, evening, additionalInfo}= form.value;
 const allFields = {...form.value,...this.nestedFormValues}
  console.log(allFields)
  // console.log('-->',selectMedInput);
}
}
