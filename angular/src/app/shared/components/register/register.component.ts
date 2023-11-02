import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { doctor } from './util';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private router:Router,private activeRoute:Router,private userService:UserService){}
  ngOnInit(): void {
     console.log(this.currentPath());
      
  }
  currentUser:any = {};
  currentPath() {
    return this.activeRoute.url
  }

  register(form:NgForm){
    console.log(this.activeRoute.url.split('/')[1]);
    if(this.activeRoute.url.split('/')[1] === 'doctor'){
      this.currentUser = doctor;
      this.currentUser = form.value
      console.log(this.currentUser);
      this.userService.registerDoctor(this.currentUser).subscribe(data => {
        console.log(data);
        
      })

    }
    console.log(this.currentUser);
    

    const { 
        firstName,
        middleName,
        surName,
        personaliD,
        image,
        phoneNumber,
        uinNumber,
        companyName,
        password,
        rePassword
          } = form.value
          form.reset()
          
  } 
}

