import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router) { }

  setToken(token : string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedIn() {
    return this.getToken()!== null? true: false;  
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  login({username, password}: any) {
    console.log("token set")

    if(username== 'admin@gmail.com' && password == 'admin123') {
      this.setToken('absdkjabiwjnckjnska');
      console.log("token set")
      this.router.navigate(['admin']);
     return true;
    }
    else{
      alert('failed to login');
      return false;
    }

    // return throwError(new Error('Failed to Login'));
  }
}
