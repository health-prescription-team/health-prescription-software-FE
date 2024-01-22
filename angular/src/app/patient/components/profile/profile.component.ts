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
  role:string = ''
  noRecipes:boolean = false;
  profileImage:any
  data:any;
  noUser:boolean=true;

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    this.data = this.userService.jwtdecrypt(token!);
    // if(data.role === 'GP'){
    //   console.log(this.prescriptions);

    // }

    // this.name = data.unique_name;


    this.route.params.subscribe((params) => {
      // Retrieve the 'id' parameter from the URL

      // this.id = params['id'];
      this.egn = params['id'];
      console.log('ID from URL:', this.egn);
    });
    this.getProfile();
    this.role = this.data.role;
  }

  getProfile() {
    this.userService.getProfile(this.egn).subscribe(
      (res:any) => {
        this.noUser=false;
        this.prescriptions = res.patientPrescriptions
        console.log(res.patientPrescriptions);
        this.profileImage = res.profileImage;

        if(this.prescriptions.length <= 0){
          this.noRecipes = true
        } else {
          this.noRecipes = false
        }
        if(this.role === 'GP' || this.role === 'Pharmacist' ){
          this.name = res.patientNames

          this.id = res.patientEGN;
        } else if(this.role === 'Patient') {
          console.log(this.data);
          this.name = this.data.unique_name
          this.id = this.data.EGN;
        }
        console.log(this.noRecipes);


      },
      (err) => {
        this.noUser=true;
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
