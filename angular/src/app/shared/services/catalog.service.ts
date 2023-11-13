import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private HttpClient:HttpClient
  ) { }

  getAll(){
    return this.HttpClient.get("API/Medicine")
  }
}
