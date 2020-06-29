import { Injectable } from '@angular/core';
import { IIngredient } from 'src/app/models/ingredient.model';
import { urlAPI, defaultHttpOptions } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IIngredient[]> {
    return this.http.get<IIngredient[]>(`${urlAPI}ingredient`, defaultHttpOptions)
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

  getById(id: number): Observable<IIngredient> {
    return this.http.get<IIngredient[]>(`${urlAPI}ingredient/${id}`, defaultHttpOptions)
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

  add(entity: IIngredient): Observable<boolean> {
    return this.http.post<IIngredient>(`${urlAPI}ingredient`, entity, defaultHttpOptions)
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

  update(entity: IIngredient): Observable<boolean> {
    return this.http.put<IIngredient>(`${urlAPI}ingredient`, entity, defaultHttpOptions)
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
    return this.http.delete(`${urlAPI}ingredient/${id}`)
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
