// src/app/login/login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

    constructor(private authService: AuthService) {}

    onLogin() {
      this.authService.login({ email: this.email, password: this.password }).subscribe(
        response => {
          console.log('Login con successo', response);
          localStorage.setItem('user', JSON.stringify(response.user))
          localStorage.setItem('vehicles', JSON.stringify(response.personalVehicles));
          alert(response.message || 'Login riuscito');
        },
        error => {
          console.error('Login fallito', error);
          alert(`Errore: ${error.status} - ${error.error.message || error.message}` || 'Registrazione fallita')
        }
    )
    //console.log(`Email: ${this.email}, Password: ${this.password}`);
  }
}
