import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RecipeComponent} from "./shared/components/recipe/recipe.component";

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
    path:"recipe",
    pathMatch:"full",
    component:RecipeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
