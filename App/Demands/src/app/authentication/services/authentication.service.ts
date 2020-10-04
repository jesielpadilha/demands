import { Injectable, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from 'src/app/models/user.model';
import { tap, catchError } from 'rxjs/operators';
import { urlAPI, defaultHttpOptions } from 'src/environments/environment';
import * as moment from "moment";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  private currentUser: IUser;
  userChange: Subject<IUser> = new Subject<IUser>();

  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    // if (this.isAuthenticated()) {
    //   this.currentUser = JSON.parse(localStorage.currentUser)
    // }
  }

  login(username: string, password: string): Observable<any> {

    return this.http.post<any>(`${urlAPI}user/login`, ({
      username: username,
      password: password,
    }), defaultHttpOptions)
      .pipe(
        tap<any>(data => {
          const expiresAt = new Date(this.parseJwt(data.token).exp * 1000)
          data.tokenExpiration = moment(expiresAt).format('DD/MM/YYYY HH:mm:ss')
          this.currentUser = data;
          localStorage.currentUser = JSON.stringify(this.currentUser)
          this.userChange.next(this.currentUser)
        }),
        catchError(error => {
          console.error(error.status == 404 ? 'Username or Password invalid' : 'Server error', error)
          return of(false);
        })
      )
  }

  logout() {
    this.currentUser = null
    localStorage.currentUser = null
    this.userChange.next(null)
  }

  isAuthenticated() {
    if(!localStorage.currentUser || JSON.parse(localStorage.currentUser) == null) return false

    return moment().isBefore(
      moment(JSON.parse(localStorage.currentUser).tokenExpiration, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
    )
  }

  getAuthenticatedUser() {
    if (this.isAuthenticated()) {
      return JSON.parse(localStorage.currentUser);
    }
    return null
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}