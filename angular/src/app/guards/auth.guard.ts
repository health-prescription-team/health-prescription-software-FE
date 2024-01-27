// src/app/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Check your authentication logic here
    const isAuthenticated = localStorage.getItem('token'); // Replace with your authentication logic

    if (isAuthenticated) {
      return true; // Allow navigation
    } else {
      // Redirect to login page or any other page
      return this.router.createUrlTree(['/']);
    }
  }
}

