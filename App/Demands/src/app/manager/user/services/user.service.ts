import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { urlAPI, defaultHttpOptions } from 'src/environments/environment';
import { IUser, UserType } from 'src/app/models/user.model';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  getAll() : Observable<IUser[]>{
    return this.http.get<IUser[]>(`${urlAPI}user`, defaultHttpOptions)
    .pipe(
      tap<any>(data => {
        console.log('Service: ', data)
        return of(data)
      }), 
      catchError(error => {
        console.error(error)
        return of(false);
      })
    )
  }

  getById(id: number) : Observable<IUser>{
    return this.http.get<IUser[]>(`${urlAPI}user/${id}`, defaultHttpOptions)
    .pipe(
      tap<any>(data => {
        console.log('Service: ', data)
        return of(data)
      }), 
      catchError(error => {
        console.error(error)
        return of(false);
      })
    )
  }

  add(entity: IUser) : Observable<boolean>{
    return this.http.post<IUser>(`${urlAPI}user/create`, entity, defaultHttpOptions)
    .pipe(
      tap<any>(data => {
        console.log('Service: ', data)
        return of(true)
      }), 
      catchError(error => {
        console.error(error)
        return of(false);
      })
    )
  }

  update(entity: IUser) : Observable<boolean>{
    return this.http.put<IUser>(`${urlAPI}user`, entity, defaultHttpOptions)
    .pipe(
      tap<any>(data => {
        console.log('Service: ', data)
        return of(true)
      }), 
      catchError(error => {
        console.error(error)
        return of(false);
      })
    )
  }

  delete(id: number) : Observable<boolean>{
    return this.http.delete(`${urlAPI}user/${id}`)
    .pipe(
      tap<any>(data => {
        console.log('Service: ', data)
        return of(true)
      }), 
      catchError(error => {
        console.error(error)
        return of(false);
      })
    )
  }
}
