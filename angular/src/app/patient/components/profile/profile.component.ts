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
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const data = this.userService.jwtdecrypt(token!);
    this.name = data['unique_name'];
    // this.id = localStorage.getItem('ID');

    this.route.params.subscribe(params => {
      // Retrieve the 'id' parameter from the URL
      this.egn = params['id'];
      console.log('ID from URL:', this.egn);
    });

    
    this.getProfile(this.egn);
  }

  getProfile(egn: any) {
    this.userService.getProfile(this.egn).subscribe(
      (res) => {

        console.log(res);
        this.prescriptions = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
