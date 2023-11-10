import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}
  displayAddMedicine: string = 'none';

  showAddMedicineComponent() {
    this.displayAddMedicine = 'flex';
  }
  hideAddMedicineComponent(currentmedicine:any) {
    this.displayAddMedicine = 'none';
    const data = currentmedicine;
    console.log(data);
    this.allMedicinesAdded.push(data)
  }

  allMedicinesAdded:any= [];

}
