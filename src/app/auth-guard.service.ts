import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
   jwtHelper = new JwtHelperService();

  constructor(private router: Router) {
  }
  canActivate() {

    const token = localStorage.getItem('jwt');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    alert('Session Time Out');
    this.router.navigate(['login']);
    return false;
  }
}

