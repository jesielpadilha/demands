import { Injectable } from '@angular/core';
import { urlAPI, defaultHttpOptions } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../models/order.model';
import { ITrackOrder } from '../models/track-order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${urlAPI}order`, defaultHttpOptions)
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

  getById(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${urlAPI}order/${id}`, defaultHttpOptions)
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

  getOrdersByTableId(id: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${urlAPI}order/orders-by-table/${id}`, defaultHttpOptions)
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

  getOrderOpened(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${urlAPI}order/get-orders-opened`, defaultHttpOptions)
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

  add(entity: IOrder, userId: number): Observable<boolean> {
    return this.http.post<IOrder>(`${urlAPI}order/${userId}`, entity, defaultHttpOptions)
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

  update(entity: IOrder): Observable<boolean> {
    return this.http.put<IOrder>(`${urlAPI}order`, entity, defaultHttpOptions)
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

  delete(id: number): Observable<boolean> {
    return this.http.delete(`${urlAPI}order/${id}`)
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

  setStatusOrder(entity: ITrackOrder): Observable<boolean> {
    return this.http.post(`${urlAPI}order/set-status-order`, entity, defaultHttpOptions)
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