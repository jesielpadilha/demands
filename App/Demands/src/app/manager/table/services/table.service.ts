import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { urlAPI, defaultHttpOptions } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ITable } from 'src/app/models/table.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getAll(): Observable<ITable[]> {
    return this.http.get<ITable[]>(`${urlAPI}table`, defaultHttpOptions)
      .pipe(tap<any>(data => { return of(data) }))
  }

  getById(id: number): Observable<ITable> {
    return this.http.get<ITable[]>(`${urlAPI}table/${id}`, defaultHttpOptions)
      .pipe(tap<any>(data => { return of(data) }))
  }

  add(entity: ITable): Observable<boolean> {
    return this.http.post<ITable>(`${urlAPI}table`, entity, defaultHttpOptions)
      .pipe(
        tap<any>(data => {
          return of(true)
        }),
        catchError(error => {
          console.error(error)
          return of(false);
        })
      )
  }

  update(entity: ITable): Observable<boolean> {
    return this.http.put<ITable>(`${urlAPI}table`, entity, defaultHttpOptions)
      .pipe(
        tap<any>(data => {
          return of(true)
        }),
        catchError(error => {
          console.error(error)
          return of(false);
        })
      )
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete(`${urlAPI}table/${id}`)
      .pipe(
        tap<any>(data => {
          return of(true)
        }),
        catchError(error => {
          console.error(error)
          return of(false);
        })
      )
  }

  chnageBusyStatus(id: number): Observable<ITable> {
    return this.http.get<ITable[]>(`${urlAPI}table/change-busy-status/${id}`, defaultHttpOptions)
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
}
