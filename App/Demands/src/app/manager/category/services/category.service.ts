import { Injectable } from '@angular/core';
import { ICategoryProduct } from 'src/app/models/category-product.model';
import { urlAPI, defaultHttpOptions } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  
  getAll() : Observable<ICategoryProduct[]>{
    return this.http.get<ICategoryProduct[]>(`${urlAPI}category-product`, defaultHttpOptions)
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

  getById(id: number) : Observable<ICategoryProduct>{
    return this.http.get<ICategoryProduct[]>(`${urlAPI}category-product/${id}`, defaultHttpOptions)
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

  add(entity: ICategoryProduct) : Observable<boolean>{
    return this.http.post<ICategoryProduct>(`${urlAPI}category-product`, entity, defaultHttpOptions)
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

  update(entity: ICategoryProduct) : Observable<boolean>{
    return this.http.put<ICategoryProduct>(`${urlAPI}category-product`, entity, defaultHttpOptions)
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
    return this.http.delete(`${urlAPI}category-product/${id}`)
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
