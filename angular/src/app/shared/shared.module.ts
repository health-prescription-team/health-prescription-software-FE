import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeAddMedFormComponent } from './components/recipe-add-med-form/recipe-add-med-form.component';



@NgModule({
  declarations: [
    RecipeComponent,
    RecipeAddMedFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
