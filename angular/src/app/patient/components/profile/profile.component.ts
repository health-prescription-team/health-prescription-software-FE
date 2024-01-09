import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public loaderService: LoaderService,
    private toastr: ToastrService
  ) {}
  name: string = '';
  id: string | null | undefined;
  egn!: string;
  prescriptions: any;
  isFulfilled: boolean = false;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const data = this.userService.jwtdecrypt(token!);
    this.name = data.unique_name;

    this.route.params.subscribe((params) => {
      // Retrieve the 'id' parameter from the URL
      this.id = params['id'];
      this.egn = params['id'];
      console.log('ID from URL:', this.egn);
    });

    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile(this.egn).subscribe(
      (res) => {
        console.log('res', res);
        this.prescriptions = res;
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

    const compareByDate = (a:any, b:any) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      // @ts-ignore
      return dateB - dateA;
    };

// Sorting the array based on the 'createdAt' property
    const prescriptions = this.prescriptions.filter(
      (p: any) => p.isFulfilled === this.isFulfilled
    )
    return prescriptions.sort(compareByDate);
  }

  setFulfilled(value: boolean): void {
    this.isFulfilled = value;
  }
}
