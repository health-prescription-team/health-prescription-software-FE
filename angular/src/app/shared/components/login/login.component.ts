import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: Router,
    private UserService: UserService
  ) {}
  isPharamcyLogin: boolean = false;
  isEgn: boolean = false;
  isEmailInput: boolean = false;
  currentPath: string = '';
  urlPath: string = '';

  ngOnInit(): void {
    this.isPharmacy();
    this.isEmail();
    this.getcurrentPath();
  }
  getcurrentPath() {
    this.currentPath = this.activeRoute.url.split('/')[1];
    return this.currentPath;
  }
  isPharmacy() {
    const currentPath = this.activeRoute.url.split('/')[1];
    if (currentPath == 'pharmacy') {
      console.log(currentPath);
      this.isPharamcyLogin = true;
      console.log(this.isPharamcyLogin);
    }
  }
  isEmail() {
    const currentPath = this.activeRoute.url.split('/')[1];
    if (currentPath == 'pharmacy') {
      this.isEmailInput = true;
    }
  }
  //TODO: Doctor and Pharmacist should be implement!
  login(forms: NgForm) {
    if (forms.invalid) return;

    // const {id,password} =  forms.value;
    const currentPath = this.activeRoute.url.split('/')[1];
    // console.log(currentPath);
    //  console.log(forms.value)

    const payload = new FormData();
    for (const formDatum of Object.entries(forms.value)) {
      // @ts-ignore
      payload.append(formDatum[0], formDatum[1]);
    }

    if (currentPath == 'doctor') {
      this.UserService.loginDoctor(payload).subscribe(
        (res:any) => {
          console.log(res);
          localStorage.setItem("token",res.token);
          this.router.navigate([`${currentPath}/recipe/new`]);
        },
        (error) => {
          alert('Something went wrong');
        }
      );
    }
    if (currentPath == 'patient') {
      this.UserService.loginPatient(payload).subscribe(
        (res:any) => {
          
          localStorage.setItem("token",res.token);
          //@ts-ignore
          localStorage.setItem("ID",payload.get('Egn'))
          this.router.navigate([`${currentPath}/profile`]);
        },
        (error) => {
          alert('Something went wrong');
        }
      );
    }
    if (currentPath == 'pharmacist') {
      this.UserService.loginPharmacist(payload).subscribe(
        (res:any) => {
          localStorage.setItem("token",res.token);
          this.router.navigate([`${currentPath}/search`]);
        },
        (error) => {
          alert('Something went wrong');
        }
      );
    }
    if (currentPath == 'pharmacy') {
      this.UserService.loginPharmacy(payload).subscribe(
        (res:any) => {
          localStorage.setItem("token",res.token);
          this.router.navigate([`${currentPath}/add-medicine`]);
        },
        (error) => {
          alert('Something went wrong');
        }
      );
    }
    // if(this.isPharamcyLogin){
    //  console.log(forms.value);
    //
    // this.router.navigate([`${currentPath}/add-medicine`]);
    // }
  }
}
