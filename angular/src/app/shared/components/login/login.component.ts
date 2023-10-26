import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router:Router,private activeRoute:Router){

  }
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
   if(currentPath == 'pharmacy'){
    this.router.navigate([`${currentPath}/add-medicine`]);
   }
    
  }
}
