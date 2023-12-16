import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor( private router:Router) {}
  displayAddMedicine: string = 'none';

  showAddMedicineComponent() {
    this.displayAddMedicine = 'flex';
  }

  hideAddMedicineComponent(name:any) {

    this.displayAddMedicine = 'none';
    for (const entries of Object.entries(this.nestedFormValues)) {
      // @ts-ignore
      this.nestedFormValues[entries[0]] = ""
    }

  }
  addMedicine(currentmedicine:any, name:any){
    this.allMedicinesAdded.push({...currentmedicine})
    this.hideAddMedicineComponent(name)
  }


  allMedicinesAdded:any= [];

  nestedFormValues= {
    morningDose:0,
    measurementUnit:"",
    lunchTimeDose:0,
    eveningDose: 0,
    notes: "",
    medicineId:"",
  }


  logout() {
    console.log('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('ID');
    this.router.navigate(['/']);

  }
}
