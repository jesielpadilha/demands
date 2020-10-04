import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup
  username: FormControl
  password: FormControl
  loginError: string

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);

    this.userForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  login(formValues) {
    this.authService.login(formValues.username, formValues.password).subscribe(res => {
      if (!res) {
        this.loginError = 'Username or Password invalid'
      } else {
        this.router.navigate(['/home'])
      }
    })
  }

}
