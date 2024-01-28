import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {DynamicSearchMedicament} from "../interfaces";

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  createRecipe(formData: any) {
    return this.http.post('API/Prescription', formData);
  }

  getMedicamentsForSearch() {
    return this.http.get<{medicaments:DynamicSearchMedicament[]}>('API/Medicine/DynamicSearch');
  }

  getRecipe(id: string) {
    return this.http.get(`API/Prescription/${id}`);
  }

  editRecipe(formData: any) {
    return this.http.put('API/Prescription', formData);
  }

  fulfillRecipe(id: string) {
    return this.http.post(`API/Prescription/Complete/${id}`,null);
  }

  deletelRecipe(id: string) {
    return this.http.delete(`API/Prescription/${id}`);
  }
}
