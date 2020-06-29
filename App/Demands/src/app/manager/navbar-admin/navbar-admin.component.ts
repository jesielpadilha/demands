import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.sass'],
})
export class NavbarAdminComponent implements OnInit {

  constructor(public authService: AuthenticationService, public commonService: CommonService,
    private router: Router) {}

  ngOnInit(): void {
    this.commonService.setAdmin()
  }

  backCommonArea(){
    this.commonService.setNotAdmin()
    this.router.navigate(['home'])
  }

}
