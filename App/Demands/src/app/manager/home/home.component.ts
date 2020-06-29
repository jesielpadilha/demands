import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthenticationService, private router: Router, 
    private commonService: CommonService) {

   }

  ngOnInit(): void {
    this.commonService.setAdmin()
    if(!this.authService.isAuthenticated()) this.router.navigate(['/authentication/login'])
  }  

}
