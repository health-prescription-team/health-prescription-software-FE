import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL,registerEndpoint } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  registerDoctor(data:FormData){
    return this.http.post(registerEndpoint +"/Gp",data)
  }
  registerPatient(data:FormData){
    return this.http.post(registerEndpoint +"/Patient",data)
  }
  registerPharmacy(data:FormData){
    return this.http.post(registerEndpoint +"/Pharmacy",data)
  }
  registerPharmacist(data:FormData){
    return this.http.post(registerEndpoint +"/Pharmacist",data)
  }
}
