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
  hideAddMedicineComponent() {
    this.displayAddMedicine = 'none';
  }
}
