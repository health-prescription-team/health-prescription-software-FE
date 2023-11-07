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
  getFormData(formValue:any){
    const formData = new FormData()

    const array = Object.entries(formValue)
    for (const arrayElement of array) {
      // @ts-ignore
      formData.append(arrayElement[0],arrayElement[1])

    }

    return formData
  }

  currentPath() {
    return this.activeRoute.url
  }
   data:any = '';
  register(form:any){
    if(this.activeRoute.url.split('/')[1] === 'doctor'){

      const payload = this.getFormData(form.value)
      payload.delete("ProfilePicture")
      payload.delete("rePassword")
      payload.append("ProfilePicture",this.imageBinary)


      this.userService.registerDoctor(payload).subscribe(data => {
        // console.log(data);

      })

    }

  }
}

