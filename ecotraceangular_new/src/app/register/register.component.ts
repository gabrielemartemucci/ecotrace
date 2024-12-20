import { Component } from '@angular/core';
import { AuthService } from '../authservice';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  name: string = '';
  surname: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}


  onLogin() {
    this.router.navigate(['/login']);
  }
  onRegister() {
    this.authService.register({ name: this.name, surname: this.surname, email: this.email, password: this.password }).subscribe(
        response => {
          console.log('Registrazione con successo', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registrazione fallita', error);
          alert(`Errore: ${error.status} - ${error.error.message || error.message}` || 'Registrazione fallita')
        }
    )
    console.log(`Email: ${this.email}, Nome: ${this.name}, Cognome: ${this.surname}, Password: ${this.password}`);
  }
}
