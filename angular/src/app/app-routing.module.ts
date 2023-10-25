import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { RecipeComponent } from './shared/components/recipe1/recipe/recipe.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"/home"
  },
  {
    path:"home",
    pathMatch:"full",
    component:HomeComponent
  },
  {
    //test
    path:"doctor/login",
    pathMatch:"full",
    component:LoginComponent
  },
  {
    //doctor register
    path:"doctor/register",
    pathMatch:"full",
    component:RegisterComponent
  },
  {
    //create recipe
    path:"doctor/recipe/new",
    pathMatch:"full",
    component:RecipeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
