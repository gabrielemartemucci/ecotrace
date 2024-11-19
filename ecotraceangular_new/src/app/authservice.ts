import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth'; // URL del back-end Spring Boot

  constructor(private http: HttpClient) { }

  register(user: { name: string, surname: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(loginRequest: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginRequest);
  }
}
