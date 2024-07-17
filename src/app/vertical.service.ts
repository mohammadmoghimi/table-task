import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerticalService {
  private apiUrl = 'http://localhost:3000/api/verticalList';
  private newItemSubject = new Subject<any>();

  newItem$ = this.newItemSubject.asObservable();

  constructor(private http: HttpClient) { }

  addVerticalItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(tap(newItem => this.newItemSubject.next(newItem)));
  }
}
