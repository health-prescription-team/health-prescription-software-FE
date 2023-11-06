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
}