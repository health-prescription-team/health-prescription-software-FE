import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    
    constructor( private userService:UserService,private router: Router){}
  name:string = '';
  role:string = '';
  ngOnInit(): void {
    // get Name() {
      const token = localStorage.getItem('token')
      const allData = this.userService.jwtdecrypt(token!)
      this.name = allData['unique_name']
      this.role = allData['role']
      
    //   return
    // }
  }
  logout() {
    console.log('logout');
    localStorage.removeItem('token');
    localStorage.removeItem('ID');
    this.router.navigate(['/']);
    
  }
 

}
