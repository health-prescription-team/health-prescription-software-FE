import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { CacheService } from '../shared/services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {

  constructor(private router: Router, private decoder:UserService, private cacheService:CacheService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Check your authentication logic here
    const tokenRaw = localStorage.getItem('token'); // Replace with your authentication logic
    const token = this.decoder.jwtdecrypt(tokenRaw!)
      console.log(token.role);
      
    if(token.role === 'GP') {
      return this.router.createUrlTree(['/404']);
    } else {
      return true
    }
  }
}
