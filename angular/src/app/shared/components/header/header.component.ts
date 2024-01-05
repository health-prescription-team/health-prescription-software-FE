import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CacheService } from '../../services/cache.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
    private cacheService: CacheService
  ) {}
  name: string = '';
  role: string = '';
  id:string = '';
  // email:string = '';

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const allData = this.userService.jwtdecrypt(token!);
    console.log('allData', allData);

    // this.email = allData['email'];
    this.name = allData['unique_name'];
    this.role = allData['role'];
    this.id=allData['nameId']
    if(!this.name){
      this.name = allData['email'];
    }
  }

  logout() {
    this.cacheService.logout();
  }

  greetings:any={
    'GP': 'д-р',
    'Patient': 'г-н/г-жо',
    'Pharmacy': 'г-н/г-жо',
    'Pharmacist': 'г-н/г-жо'
  }
}
