import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor( private userService:UserService){}
  name:string = '';
  id:any;
  ngOnInit(): void {
    const token = localStorage.getItem('token')
      const data = this.userService.jwtdecrypt(token!)
      this.name = data['unique_name'];
      this.id = localStorage.getItem('ID');
      
  }
}
