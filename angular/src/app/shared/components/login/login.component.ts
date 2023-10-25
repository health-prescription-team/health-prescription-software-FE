import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router:Router){

  }
   login(forms:NgForm){
    if(forms.invalid) return;
  
    const {id,password} =  forms.value;
    console.log(id,password);
    this.router.navigate(["doctor/recipe/new"]);
  }
}
