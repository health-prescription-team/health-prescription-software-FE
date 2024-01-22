import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(
    private http:HttpClient,
              private router:Router,) {}
  prescriptions:any;

  ngOnInit(){
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("/chat")
      .build();

    connection.on("send", data => {
      console.log("hereee")
      console.log(data);
    });

    connection.start()
      .then(() => connection.invoke("send", "Hello"));
  }
  findPatient(egn:string){
      
    this.router.navigate([`/patient/profile/${egn}`])

  }
}
