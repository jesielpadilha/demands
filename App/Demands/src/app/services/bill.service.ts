import { Injectable } from '@angular/core';
import { urlAPI, defaultHttpOptions } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IBill } from '../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IBill[]> {
    return this.http.get<IBill[]>(`${urlAPI}bill`, defaultHttpOptions)
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

  getById(id: number): Observable<IBill> {
    return this.http.get<IBill>(`${urlAPI}bill/${id}`, defaultHttpOptions)
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

  closeBill(entity: any): Observable<boolean> {
    return this.http.post(`${urlAPI}bill/close-bill`, entity, defaultHttpOptions)
      .pipe(
        tap<any>(data => {
          console.log('Service: ', data)
          return of(data.status === 200)
        }),
        catchError(error => {
          console.error(error)
          return of(false);
        })
      )
  }
}
