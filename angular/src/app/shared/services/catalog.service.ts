import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private HttpClient:HttpClient
  ) { }

  getMedications(searchTerm:string, pageNumber:number, entriesPerPage:number){
    return this.HttpClient.get(`API/Medicine?SearchTerm=${searchTerm}&PageNumber=${pageNumber}&EntriesPerPage=${entriesPerPage}`)

  }

}
