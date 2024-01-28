import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChatMessage} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  fetchChat(targetUserEgn:string){
    return this.http.get<ChatMessage[]>("API/Chat?targetUserEgn="+targetUserEgn)
  }
}
