import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HorizontalService {
  private apiUrl = 'http://localhost:3000/api/horizontalList';
  private newItemSubject = new Subject<any>();

  newItem$ = this.newItemSubject.asObservable();

  constructor(private http: HttpClient) { }

  addHorizontalItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(tap(newItem => this.newItemSubject.next(newItem)));
  }
}
  