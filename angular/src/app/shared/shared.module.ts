import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeAddMedFormComponent } from './components/recipe-add-med-form/recipe-add-med-form.component';
import { RecipeInfoMedComponent } from './components/recipe-info-med/recipe-info-med.component';
import { CatalogMedicamentsComponent } from './components/catalog-medicaments/catalog-medicaments.component';



@NgModule({
  declarations: [
    RecipeComponent,
    RecipeAddMedFormComponent,
    RecipeInfoMedComponent,
    CatalogMedicamentsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
