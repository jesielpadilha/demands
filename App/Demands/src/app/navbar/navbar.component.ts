import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  userAuthenticated

  constructor(public authService: AuthenticationService, public commonService: CommonService,
    private router: Router) {
  }
  
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.userAuthenticated = this.authService.getAuthenticatedUser()
    }
  }

  goManagerArea(){
    this.commonService.setAdmin()
    this.router.navigate(['manager/home'])
  }
  
  logout(){
    this.authService.logout()
    this.commonService.setNotAdmin()
    this.router.navigate(['authentication/login'])
  }
}
