import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor(
  ) {}
  displayAddMedicine: string = 'none';

  showAddMedicineComponent() {
    this.displayAddMedicine = 'flex';
  }

  hideAddMedicineComponent(currentmedicine:any) {

    this.displayAddMedicine = 'none';
    console.log(this.nestedFormValues)
    for (const entries of Object.entries(this.nestedFormValues)) {
      // @ts-ignore
      this.nestedFormValues[entries[0]] = ""
    }

  }
  addMedicine(currentmedicine:any){
    this.allMedicinesAdded.push({...currentmedicine})

    this.hideAddMedicineComponent(currentmedicine)
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
