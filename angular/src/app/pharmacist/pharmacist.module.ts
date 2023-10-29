import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacistComponent } from './components/pharmacist/pharmacist.component';
import {RouterModule, RouterOutlet} from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import {FormsModule} from "@angular/forms";
import { AddMedicamentComponent } from './components/add-medicament/add-medicament.component';



@NgModule({
  declarations: [
    PharmacistComponent,
    SearchComponent,
    AddMedicamentComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        FormsModule
    ]
})
export class PharmacistModule { }
