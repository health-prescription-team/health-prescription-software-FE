import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { RecipeComponent } from './shared/components/recipe1/recipe/recipe.component';
import { DoctorComponent } from './doctor/doctor/doctor.component';
import { PatientComponent } from './patient/patient/patient.component';
import { SearchComponent } from './pharmacist/components/search/search.component';
import { PharmacistComponent } from './pharmacist/components/pharmacist/pharmacist.component';
import { ProfileComponent } from './patient/components/profile/profile.component';
import { AddMedicineComponent } from './pharmacy/add-medicine/add-medicine.component';
import { DetailsComponent } from './shared/components/details/details.component';
import { CatalogMedicamentsComponent } from './shared/components/catalog-medicaments/catalog-medicaments.component';
import {ChatComponent} from "./shared/components/chat/chat.component";
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { DoctorGuard } from './guards/doctor.guard';
import { patientGuard } from './guards/patient.guard';
import { pharmacistGuard } from './guards/pharmacist.guard';
import { pharmacyGuard } from './guards/pharmacy.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    //home
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'recipeDetails/:id',
    component: RecipeComponent,
    canActivate:[AuthGuard,pharmacyGuard]
  },
  {
    path: 'chat/:egn',
    component: ChatComponent,
    canActivate:[AuthGuard,pharmacistGuard,pharmacyGuard]

  },
  {
    //doctor
    path: 'doctor',
    component: DoctorComponent,
    children: [
      {
        //doctor/login
        path: 'login',
        component: LoginComponent,

      },
      {
        //doctor register
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent,
      },
    ],
  },
  {
    //patient
    path: 'patient',
    component: PatientComponent,
    children: [
      {
        //patient/login
        path: 'login',
        component: LoginComponent,
      },
      {
        //patient register
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent,
      },
      {
        //patient profile
        path: 'profile/:id', 
        pathMatch: 'full',
        component: ProfileComponent,
        canActivate:[AuthGuard,pharmacyGuard]

      },
    ],
  },
  {
    //pharmacist
    path: 'pharmacist',
    component: PharmacistComponent,
    children: [
      {
        //pharmacist login
        path: 'login',
        component: LoginComponent,
      },
      {
        //pharmacist register
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent,
      },
      {
        //pharmacist search
        path: 'search',
        pathMatch: 'full',
        component: SearchComponent,
        canActivate:[AuthGuard,patientGuard,pharmacyGuard]

      },
    ],
  },

  {
    //create recipe
    path: 'doctor/recipe/new',
    pathMatch: 'full',
    component: RecipeComponent,
    canActivate:[AuthGuard,pharmacistGuard,patientGuard,pharmacyGuard]

  },

  {
    //read single recipe
    path: 'recipe/:id',
    component: RecipeComponent,
    canActivate:[AuthGuard,pharmacyGuard]

  },
  {
    //pharmacy/login
    path: 'pharmacy/login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    //pharmacy/add-medicine
    path: 'pharmacy/add-medicine',
    pathMatch: 'full',
    component: AddMedicineComponent,
    canActivate:[AuthGuard,DoctorGuard,patientGuard,pharmacistGuard]

  },
  {
    //pharmacy/register
    path: 'pharmacy/register',
    pathMatch: 'full',
    component: RegisterComponent,
  },
  //DETAILS
  {
    path: 'details/:id',
    pathMatch: 'full',
    component: DetailsComponent,
    canActivate:[AuthGuard]

  },
  {
    path: 'catalog',
    pathMatch: 'full',
    component: CatalogMedicamentsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"**",
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
