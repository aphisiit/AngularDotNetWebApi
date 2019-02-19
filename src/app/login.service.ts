import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { NgForm } from '@angular/forms';
import {catchError} from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authenUrl = environment.baseURL.concat('/auth/login');
  constructor(private http: HttpClient) {}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  login(form: NgForm): Observable<any> {
    // TODO: Get Data Login From .NET core API
    const credentials = JSON.stringify(form.value);
    return this.http.post(this.authenUrl, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response',
    }).pipe(
      catchError(this.handleError('getHeroes', []))
    );
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }
}
