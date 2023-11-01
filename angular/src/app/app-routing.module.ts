import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { RecipeComponent } from './shared/components/recipe1/recipe/recipe.component';
import { DoctorComponent } from './doctor/doctor/doctor.component';
import { PatientComponent } from './patient/patient/patient.component';
import {SearchComponent} from "./pharmacist/components/search/search.component";
import {PharmacistComponent} from "./pharmacist/components/pharmacist/pharmacist.component";
import { ProfileComponent } from './patient/components/profile/profile.component';
import { AddMedicineComponent } from './pharmacy/add-medicine/add-medicine.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"/home"
  },
  {
    //home
    path:"home",
    pathMatch:"full",
    component:HomeComponent
  },
  {
    //doctor
    path:"doctor",
    component:DoctorComponent,
    children:[
      {
        //doctor/login
        path:"login",
        component:LoginComponent
      },
      {
        //doctor register
        path:"register",
        pathMatch:"full",
        component:RegisterComponent
      },
    ]
  },
  {
    //patient
    path:"patient",
    component:PatientComponent,
    children:[
      {
        //patient/login
        path:"login",
        component:LoginComponent
      },
      {
        //patient register
        path:"register",
        pathMatch:"full",
        component:RegisterComponent
      },
      {
        //patient profile
        path:"profile",
        pathMatch:'full',
        component:ProfileComponent
      }
    ]
  },
  {
    //pharmacist
    path:"pharmacist",
    component:PharmacistComponent,
    children:[
      {
        //pharmacist login
        path:"login",
        component:LoginComponent
      },
      {
        //pharmacist register
        path:"register",
        pathMatch:"full",
        component:RegisterComponent
      },
      {
        //pharmacist search
        path:"search",
        pathMatch:"full",
        component:SearchComponent
      }
    ]
  },


  {
    //create recipe
    path:"doctor/recipe/new",
    pathMatch:"full",
    component:RecipeComponent
  },

  {
    //pharmacy/login
    path:"pharmacy/login",
    pathMatch:"full",
    component:LoginComponent
  },
  {
    //pharmacy/add-medicine
    path:"pharmacy/add-medicine",
    pathMatch:"full",
    component:AddMedicineComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
