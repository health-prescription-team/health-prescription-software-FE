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
  imageBinary: any = ''
  handleFileInput(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const blob = new Blob([e.target.result], { type: file.type });
        console.log(blob); // You can work with the Blob here
        this.imageBinary = blob
      };

      reader.readAsArrayBuffer(file);
    }
  }

      
  currentPath() {
    return this.activeRoute.url
  }
   data:any = '';
  register(form:any){
    if(this.activeRoute.url.split('/')[1] === 'doctor'){
      const data1 = new FormData()
        console.log(form.value.uinNumber);
        
      data1.append('FirstName',form.value.firstName)
      data1.append('MiddleName',form.value.middleName)
      data1.append('LastName',form.value.surName)
      data1.append('Password',form.value.password)
      data1.append('ProfilePicture',this.imageBinary)
      data1.append('PhoneNumber',form.value.phoneNumber)
      data1.append('UinNumber',form.value.uinNumber)
      data1.append('HospitalName',form.value.hospitalName)
      data1.append('Egn',form.value.personalId)

      this.data = data1
      
      this.userService.registerDoctor(this.data).subscribe(data => {
        // console.log(data);
        
      })

    }

  } 
}

