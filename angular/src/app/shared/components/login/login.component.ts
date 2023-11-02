import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router:Router,private activeRoute:Router){
  }
  isPharamcyLogin:boolean = false;
  currentPath:string = '';
  urlPath:string = '';

  ngOnInit(): void {
    this.isPharmacy()
   this.getcurrentPath()
  }
  getcurrentPath() {
    this.currentPath = this.activeRoute.url.split('/')[1]
    return this.currentPath
  }
    isPharmacy() {
      const currentPath = this.activeRoute.url.split('/')[1];
      if(currentPath == 'pharmacy'){
        console.log(currentPath);
        this.isPharamcyLogin = true;
        console.log(this.isPharamcyLogin);
       }
    }
    //TODO: Doctor and Pharmacist should be implement!
   login(forms:NgForm){
    if(forms.invalid) return;
    
    const {id,password} =  forms.value;
    const currentPath = this.activeRoute.url.split('/')[1];
    console.log(currentPath);
    
   if(currentPath == 'doctor'){
     this.router.navigate([`${currentPath}/recipe/new`]);
   }
   if(currentPath == 'patient'){
    this.router.navigate([`${currentPath}/profile`]);
   }
   if(currentPath == 'pharmacist'){
    this.router.navigate([`${currentPath}/search`]);
   }
   if(this.isPharamcyLogin){ 
    console.log(forms.value);
     
   this.router.navigate([`${currentPath}/add-medicine`]);
   }
    
  }
}
