import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  constructor(private authService:AuthService,private routers:Router) { }

  canActivate(){
    if(!this.authService.isLoggedIn()){
      alert("Please login to process checkout ")
      this.routers.navigateByUrl('/login');
    }
    return this.authService.isLoggedIn();
  }
}
