import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  register(form:NgForm){
    const { 
        firstName,
        middleName,
        surName,
        personaliD,
        image,
        phoneNumber,
        uiNumber,
        companyName
          } = form.value
          console.log(form.value);
          
  }
}

