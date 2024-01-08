import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { doctor } from './util';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: Router,
    private userService: UserService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    // console.log(this.currentPath());
    this.currentRole = this.activeRoute.url.split('/')[1];
  }
  currentRole!: string;
  currentUser: any = {};
  imageBinary: any = '';
  handleFileInput(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const blob = new Blob([e.target.result], { type: file.type });
        this.imageBinary = blob;
      };

      reader.readAsArrayBuffer(file);
    }
  }
  getFormData(formValue: any) {
    const formData = new FormData();

    const array = Object.entries(formValue);
    for (const arrayElement of array) {
      // @ts-ignore
      formData.append(arrayElement[0], arrayElement[1]);
    }

    return formData;
  }

  currentPath() {
    return this.activeRoute.url;
  }
  data: any = '';
  register(form: any) {
    const payload = this.getFormData(form.value);
    payload.forEach((e) => {
      console.log(e);
    });

    // payload.delete("rePassword")

    if (this.activeRoute.url.split('/')[1] === 'doctor') {
      payload.delete('ProfilePicture');
      payload.append('ProfilePicture', this.imageBinary);

      this.userService.registerDoctor(payload).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          //@ts-ignore
          localStorage.setItem('ID', payload.get('Egn'));
          this.router.navigate(['doctor/recipe/new']);
          this.userService.jwtdecrypt(res.token);
          this.toastr.success('Добре дошли!');
        },
        (error) => {
          this.toastr.error('Некоректни данни!');
        }
      );
    } else if (this.activeRoute.url.split('/')[1] === 'patient') {
      payload.delete('ProfilePicture');
      payload.append('ProfilePicture', this.imageBinary);

      this.userService.registerPatient(payload).subscribe(
        (res: any) => {
          //@ts-ignore
          localStorage.setItem('ID', payload.get('Egn'));
          localStorage.setItem('token', res.token);
          this.router.navigate([`patient/profile/${payload.get('Egn')}`]);
          this.toastr.success('Добре дошли!');
        },
        (error) => {
          this.toastr.error('Некоректни данни!');
        }
      );
    } else if (this.activeRoute.url.split('/')[1] === 'pharmacy') {
      this.userService.registerPharmacy(payload).subscribe(
        (res: any) => {
          //@ts-ignore
          localStorage.setItem('ID', payload.get('Egn'));
          localStorage.setItem('token', res.token);
          this.router.navigate(['pharmacy/add-medicine']);
          this.toastr.success('Добре дошли!');
        },
        (error) => {
          this.toastr.error('Некоректни данни!');
        }
      );
    } else if (this.activeRoute.url.split('/')[1] === 'pharmacist') {
      payload.delete('ProfilePicture');
      payload.append('ProfilePicture', this.imageBinary);

      this.userService.registerPharmacist(payload).subscribe(
        (res: any) => {
          // @ts-ignore
          localStorage.setItem('ID', payload.get('Egn'));
          localStorage.setItem('token', res.token);
          this.router.navigate(['pharmacist/search']);
          this.toastr.success('Добре дошли!');
        },
        (error) => {
          this.toastr.error('Некоректни данни!');
        }
      );
    }
  }
}
