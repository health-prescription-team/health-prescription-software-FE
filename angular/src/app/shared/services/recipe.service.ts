import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

 createRecipe(formData:FormData){
  return  this.http.post('API/Prescription',formData);
}

}
