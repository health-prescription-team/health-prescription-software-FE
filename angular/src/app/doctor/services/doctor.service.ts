import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { medicineEndpoint } from 'src/app/shared/constants'


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor( private http:HttpClient) { }

  //TODO: ADD query by name
  getMedicamentsByName(){
    // return this.http.get()
  }

  addPrescription(data:any) {
    return this.http.post('some-endpoint',data)
  }
}
