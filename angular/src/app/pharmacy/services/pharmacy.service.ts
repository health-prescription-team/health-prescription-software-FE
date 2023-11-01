import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/shared/constants'

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private http:HttpClient) {}

  getAll(){
   return this.http.get(endpoints)
  }

  addMeidicine(data:any) {
    return this.http.post(endpoints,data)
  }
  editMedsicine(id:string,data:any){
   return this.http.put(`${endpoints}/${id}`,data)
  }

  deleteMedicine(id:string) {
   return this.http.delete(`${endpoints}/${id}`)
  }
}
