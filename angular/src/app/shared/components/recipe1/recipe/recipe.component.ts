import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
recipeInfo(form:NgForm){
  const {patient, patientАge, doctor, diagnosis, selectMedInput, morning, midday, evening, additionalInfo}= form.value;
  console.log(form.value);
}
}
