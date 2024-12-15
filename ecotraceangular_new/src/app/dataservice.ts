import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/co2'; // URL base dell'API

  constructor(private http: HttpClient) {}

  // Ottieni dati settimanali di CO2
  getWeeklyCo2Emission(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/weekly?user_id=${userId}`);
  }

  // Ottieni dati mensili di CO2
  getMonthlyCo2Emission(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/monthly?user_id=${userId}`);
  }

  getDailyCo2EmissionLast7Days(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/daily/7days?user_id=${userId}`);
  }

  getDailyCo2EmissionLast30Days(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/daily/30days?user_id=${userId}`);
  }

  getCo2Today(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/daily/today?user_id=${userId}`)
  }

  getCo2MaxDay(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/daily/maxday?user_id=${userId}`)
  }

  getCo2MinDay(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/daily/minday?user_id=${userId}`)
  }
}
