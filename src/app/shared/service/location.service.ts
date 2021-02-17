import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { City } from '../models/city';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public baseApi = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private _http: HttpClient) {
  }

  getAllLocations() {
    return this._http.get<Location[]>(this.baseApi + '/allLocations/')
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllCities() {
    return this._http.get<City[]>(this.baseApi + '/allCities/')
      .pipe(
        catchError(this.handleError)
      );
  }

  findLocation(id: number) {
    return this._http.get(this.baseApi + '/allLocations/' + id)
      .pipe(
        catchError(this.handleError)
      )
  }

  create(data: any) {
    return this._http.post(this.baseApi + '/allLocations/', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  update(id: number, data: any) {
    return this._http.put(this.baseApi + '/allLocations/' + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  delete(id: number) {
    return this._http.delete(this.baseApi + '/allLocations/' + id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
