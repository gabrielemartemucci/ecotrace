import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactorsService {

  private apiUrl = 'http://localhost:8080/api/factors';

  constructor(private http: HttpClient) { }

  getTransports(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trasporti`);
  }

  getFood(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cibo`);
  }

  getEnergy(): Observable<any> {
    return this.http.get(`${this.apiUrl}/energia`);
  }

}
