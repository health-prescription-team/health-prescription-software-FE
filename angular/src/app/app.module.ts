import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "./shared/shared.module";
import {DoctorModule} from "./doctor/doctor.module";
import {PharmacistModule} from "./pharmacist/pharmacist.module";
import {PharmacyModule} from "./pharmacy/pharmacy.module";
import {PatientModule} from "./patient/patient.module";
import {TokenInterceptor} from "./shared/interceptors/token.interceptor";
import {ApiInterceptor} from "./shared/interceptors/api.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { FormsModule, NgForm } from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    DoctorModule,
    PharmacistModule,
    PharmacyModule,
    PatientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor, // Add your interceptor class here
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor, // Add your interceptor class here
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
