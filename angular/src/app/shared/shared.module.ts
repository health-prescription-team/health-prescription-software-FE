import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './components/recipe1/recipe/recipe.component';
import { RecipeAddMedFormComponent } from './components/recipe1/recipe-add-med-form/recipe-add-med-form.component';
import { RecipeInfoMedComponent } from './components/recipe1/recipe-info-med/recipe-info-med.component';
import { CatalogMedicamentsComponent } from './components/catalog-medicaments/catalog-medicaments.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { PasswordMatchValidatorDirective } from './validators/password-validators.directive';




@NgModule({
  declarations: [
    RecipeComponent,
    RecipeAddMedFormComponent,
    RecipeInfoMedComponent,
    CatalogMedicamentsComponent,
    LoginComponent,
    RegisterComponent,
    PasswordMatchValidatorDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedModule { }
