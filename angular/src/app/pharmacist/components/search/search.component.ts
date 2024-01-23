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

  }
  findPatient(egn:string){

    this.router.navigate([`/patient/profile/${egn}`])

  }
}
