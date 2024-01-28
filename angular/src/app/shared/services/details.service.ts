import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { medicineEndpoint } from '../constants';
import { CacheService } from './cache.service';
import {MedicamentCatalogDetails} from "../interfaces";

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  constructor(
    private HttpClient: HttpClient,
    private CacheService: CacheService
  ) {}

  getMedicine(id: string) {
    return this.HttpClient.get<MedicamentCatalogDetails>(medicineEndpoint + `/${id}`);
  }
  deleteMedicament(id: string) {
    const index = this.CacheService.allMedicinesAdded.findIndex(
      (el: any) => el.medicineId === id
    );
    this.CacheService.allMedicinesAdded.splice(index, 1);
  }

  delMedicament(id:string){
return this.HttpClient.delete(medicineEndpoint + `/${id}`)
  }
}
