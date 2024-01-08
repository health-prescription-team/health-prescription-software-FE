import { Component, OnInit } from '@angular/core';
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
    public loaderService: LoaderService,
    private toastr:ToastrService
  ) {}
  name: string = '';
  id: any;
  egn!: string;
  prescriptions: any;
  isFulfilled: boolean = false;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const data = this.userService.jwtdecrypt(token!);
    this.name = data.unique_name;

    // this.route.params.subscribe((params) => {
    //   const egn = params['id'];
    // }); --> при прехвърляне от каталог (или друга страниця) към профил - няма егн - undefined

    this.getProfile();
  }

  getProfile() {
    this.infoFromToken()
    this.userService.getProfile(this.egn).subscribe(
      (res) => {
        this.prescriptions = res;
      },
      (err) => {
        this.toastr.warning('Нещо се обърка. Моля, опитайте отново.')
      }
    );
  }

  get displayedRecipes(): any[] {
    if (!this.prescriptions) {
      return [];
    }
    return this.prescriptions.filter(
      (p: any) => p.isFulfilled === this.isFulfilled
    );
  }

  setFulfilled(value: boolean): void {
    this.isFulfilled = value;
  }

  infoFromToken(){
    const token = localStorage.getItem('token');
    const decodedData = this.userService.jwtdecrypt(token!);
    this.egn=decodedData.EGN;
  }
}
