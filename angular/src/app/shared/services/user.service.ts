import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {API_URL, loginEndpoint, prescriptionEndpoint, registerEndpoint} from '../constants';
import  * as jwt  from 'jsonwebtoken';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  token:string='';
  role:string='';


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

  //login
  loginPharmacist(data:FormData){
    return this.http.post(loginEndpoint +"/Pharmacist",data)
  }
  loginPharmacy(data:FormData){
    return this.http.post(loginEndpoint +"/Pharmacy",data)
  }
  loginDoctor(data:FormData){
    return this.http.post(loginEndpoint +"/Gp",data)
  }
  loginPatient(data:FormData){
    return this.http.post(loginEndpoint +"/Patient",data)
  }

  jwtdecrypt(token: string): any {

    const decodedToken = jwtDecode(token);
    //@ts-ignore
    this.role=decodedToken['role'];
    return decodedToken
  }

  getProfile(personalId:any){
    return this.http.get(prescriptionEndpoint+'?patientEgn='+personalId)
    //Prescription?patientEgn=333333333
  }
}
