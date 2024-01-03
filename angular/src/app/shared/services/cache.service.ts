import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor(private router: Router) {}
  displayAddMedicine: string = 'none';
  medName: string = '';

  showAddMedicineComponent() {
    this.displayAddMedicine = 'flex';
  }

  hideAddMedicineComponent(name: any, id?: string) {
    this.displayAddMedicine = 'none';
    if (!id) {
      for (const entries of Object.entries(this.nestedFormValues)) {
        // @ts-ignore
        this.nestedFormValues[entries[0]] = '';
      }
    }
  }
  addMedicine(currentmedicine: any, name: any) {
    if (name) {
      currentmedicine.medicineName = name;
      this.allMedicinesAdded.push({ ...currentmedicine });
      this.hideAddMedicineComponent(name);
    }
  }
  editMedicine(currentmedicine: any, name: any) {
    console.log(currentmedicine.medicineId);
    currentmedicine.medicineName = name;

    // 0
    const indexOfCurrentRecord = this.allMedicinesAdded.findIndex(
      (x: any) => x.medicineId === currentmedicine.medicineId
    );
    this.allMedicinesAdded[indexOfCurrentRecord] = currentmedicine;
  }

  allMedicinesAdded: any = [];

  nestedFormValues = {
    medicineName: '',
    morningDose: 0,
    measurementUnit: 'mg',
    lunchTimeDose: 0,
    eveningDose: 0,
    notes: '',
    medicineId: '',
  };

  logout() {
    console.log('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('ID');
    this.router.navigate(['/']);
  }
}
