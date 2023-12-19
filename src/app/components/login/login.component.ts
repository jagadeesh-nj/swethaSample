import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  faLock = faLock;
  loginForm = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  constructor(private authService : AuthService, private router: Router){}
  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['admin']);
    }
    
  }
  onSubmit() {
    console.log(this.loginForm.valid);
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }

}
