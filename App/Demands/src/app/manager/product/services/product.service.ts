import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { urlAPI, defaultHttpOptions } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${urlAPI}product`, defaultHttpOptions)
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

  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct[]>(`${urlAPI}product/get-product/${id}`, defaultHttpOptions)
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

  add(entity: IProduct): Observable<boolean> {
    return this.http.post<IProduct>(`${urlAPI}product`, entity, defaultHttpOptions)
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

  update(entity: IProduct): Observable<boolean> {
    return this.http.put<IProduct>(`${urlAPI}product`, entity, defaultHttpOptions)
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
    return this.http.delete(`${urlAPI}product/${id}`)
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