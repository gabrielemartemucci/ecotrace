// src/app/login/login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importa Router per il reindirizzamento
import { AuthService } from '../authservice';  // Importa il servizio di autenticazione

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  // Inietta sia il servizio di autenticazione che il router per navigare
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      response => {
        console.log('Login con successo', response);
        
        // Salva i dati dell'utente e i veicoli nel localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('vehicles', JSON.stringify(response.personalVehicles));

        // Messaggio di successo
        alert(response.message || 'Login riuscito');
        
        // Reindirizza l'utente alla home dopo il login
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login fallito', error);
        alert(`Errore: ${error.status} - ${error.error.message || error.message}` || 'Login fallito');
      }
    );
  }
}
