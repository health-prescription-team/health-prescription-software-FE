import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService,private route:ActivatedRoute) {}
  name: string = '';
  id: any;
  egn!: string;
  prescriptions: any;
  isFulfilled: boolean = false;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const data = this.userService.jwtdecrypt(token!);

    this.route.params.subscribe(params => {
      this.egn = params['id'];
    });


    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile(this.egn).subscribe(
      (res) => {
        this.prescriptions = res;
       this.name= this.prescriptions[0].patientNames;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get displayedRecipes(): any[] {
    if (!this.prescriptions) {
      return [];
    }
    return this.prescriptions.filter((p:any) => p.isFulfilled === this.isFulfilled);
  }

  setFulfilled(value: boolean): void {
    this.isFulfilled = value;
  }


}
