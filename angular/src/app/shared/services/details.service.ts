import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {medicineEndpoint} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(
    private HttpClient:HttpClient
  ) { }

  getMedicine(id:string){
    return this.HttpClient.get(medicineEndpoint+`/${id}`)
  }
}
