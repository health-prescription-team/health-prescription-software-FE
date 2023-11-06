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
    // console.log(this.activeRoute.url.split('/')[1]);
    if(this.activeRoute.url.split('/')[1] === 'doctor'){
      
      this.currentUser = {
        FirstName: ['Ivan'],
        MiddleName: ['Ivanov'],
        LastName: ['Petrov'],
        Egn: ['1078782727'],
        ProfilePicture: ['wwe'],
        PhoneNumber: ['08876564523'],
        UinNumber: ['2354'],
        HospitalName: ['Pirogov'],
        Password: ['Health12345$'],
      };
      // this.currentUser = form.value
      // console.log(this.currentUser);
      
      const data1 = new FormData()

    

      console.log(form.value);
      
      data1.append('FirstName','Ivan')
      data1.append('MiddleName','Doctor')
      data1.append('LastName','Petrov')
      data1.append('Password','Health12345@')
      data1.append('ProfilePicture',this.imageBinary)
      data1.append('PhoneNumber','0887675656')
      data1.append('UinNumber','1234567890')
      data1.append('HospitalName','Pirogov')
      data1.append('Egn','1098765435')

      
      // console.log(this.currentUser);
      this.data = data1
      console.log(this.data);
      
      this.userService.registerDoctor(this.data).subscribe(data => {
        // console.log(data);
        
      })

    }
    console.log(this.currentUser);
    

    // const { 
    //     "FirstName":[firstName],
    //     middleName,
    //     surName,
    //     personaliD,
    //     image,
    //     phoneNumber,
    //     uinNumber,
    //     companyName,
    //     password,
    //     rePassword
    //       } = form.value
    //       form.reset()
          
  } 
}

