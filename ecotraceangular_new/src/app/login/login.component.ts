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
  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.router.navigate(['/register'])
  }

  onLogin() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      response => {
        console.log('Login con successo', response);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('vehicles', JSON.stringify(response.vehicles));
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Login fallito', error);
        alert(`Errore: ${error.status} - ${error.error.message || error.message}` || 'Login fallito');
      }
    );
  }
}
