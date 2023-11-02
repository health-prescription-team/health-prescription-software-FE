import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { medicineEndpoint } from 'src/app/shared/constants'

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private http:HttpClient) {}

  getAll(){
   return this.http.get(medicineEndpoint)
  }

  addMeidicine(data:any) {
    return this.http.post(medicineEndpoint,data)
  }
  editMedicine(id:string,data:any){
   return this.http.put(`${medicineEndpoint}/${id}`,data)
  }

  deleteMedicine(id:string) {
   return this.http.delete(`${medicineEndpoint}/${id}`)
  }
}
