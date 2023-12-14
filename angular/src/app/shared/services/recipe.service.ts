import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  createRecipe(formData: any) {
    return this.http.post('API/Prescription', formData);
  }

  getMedicamentsForSearch() {
    return this.http.get('API/Medicine/DynamicSearch');
  }
}
