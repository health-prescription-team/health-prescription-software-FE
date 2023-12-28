import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(private http:HttpClient,private router:Router) {}
  prescriptions:any;
  findPatient(egn:string){
    
    this.router.navigate([`/patient/profile/${egn}`])
    
  }
}
