import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from 'src/app/models/user.model';
import { tap, catchError } from 'rxjs/operators';
import { urlAPI, defaultHttpOptions } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  private currentUser: IUser;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.currentUser = JSON.parse(localStorage.currentUser)
    }
  }

  login(username: string, password: string): Observable<any> {

    return this.http.post<any>(`${urlAPI}user/login`, ({
      username: username,
      password: password,
    }), defaultHttpOptions)
    .pipe(
      tap<any>(data => {
        this.currentUser = data;
        localStorage.currentUser = JSON.stringify(this.currentUser) 
      }), 
      catchError(error => {
        console.error(error.status == 404 ? 'Username or Password invalid' : 'Server error')
        return of(false);
      })
    )
  }

  logout() {
    this.currentUser = null
    localStorage.currentUser = null
  }

  isAuthenticated() {
    return JSON.parse(localStorage.currentUser) != undefined && JSON.parse(localStorage.currentUser) != null
  }

  getAuthenticatedUser(){
    if(this.isAuthenticated()){
      return JSON.parse(localStorage.currentUser);
    }
  }
}
