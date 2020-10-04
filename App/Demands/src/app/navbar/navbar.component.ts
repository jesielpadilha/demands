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

  userAuthenticated = null
  _subscription

  constructor(public authService: AuthenticationService, public commonService: CommonService,
    private router: Router) {

  }

  ngOnInit(): void {
    this._subscription = this.authService.userChange.subscribe((value) => {
      this.userAuthenticated = value
    })
    if(this.userAuthenticated == null){
      this.userAuthenticated = this.authService.getAuthenticatedUser()
    }
  }

  goManagerArea() {
    this.commonService.setAdmin()
    this.router.navigate(['manager/home'])
  }

  logout() {
    this.authService.logout()
    this.commonService.setNotAdmin()
    this.router.navigate(['authentication/login'])
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this._subscription.unsubscribe();
  }
}
