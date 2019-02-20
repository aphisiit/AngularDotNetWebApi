import { Injectable } from '@angular/core';
import { Item } from './item';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private itemUrl = environment.baseURL.concat('/item');

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
      // This must have itemMessage for call
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getItem(): Observable<Item[]> {
    // TODO: send the message _after_ fetching the heroes
    // this.messageService.add('HeroService: fetched heroes');
    // return of(HEROES);
    // TODO: Get Heroes From .Net Core web api
    return this.http.get<Item[]>(this.itemUrl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }
}
