import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmissionService {
  private apiUrl = 'http://localhost:8080/api/emissions/calculate';

  constructor(private http: HttpClient) {}

  calculateEmissions(calculate: {data: any, id: any }): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    const params = new HttpParams().set('id', calculate.id.toString());

    return this.http.post(this.apiUrl, calculate.data, { headers, params });
  }
}
