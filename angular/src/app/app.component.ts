import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'angular';

  isAuth:any = false;
 
  get Token (){
    const token =  localStorage.getItem('token')
    if(token){
      return true
    } else {
      return false
    } 
  }
  
}
