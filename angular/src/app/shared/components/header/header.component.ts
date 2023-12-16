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
  ngOnInit(): void {
    // get Name() {
    const token = localStorage.getItem('token');
    const allData = this.userService.jwtdecrypt(token!);
    this.name = allData['unique_name'];
    this.role = allData['role'];

    //   return
    // }
  }

  logout() {
    this.cacheService.logout();
  }
}
