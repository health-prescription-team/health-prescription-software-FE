import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  fetchChat(targetUserEgn:string){
    return this.http.get("API/Chat?targetUserEgn="+targetUserEgn)
  }
}
