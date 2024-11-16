// src/app/register/register.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';

  onRegister() {
    console.log(`Email: ${this.email}, Nome: ${this.firstName}, Cognome: ${this.lastName}, Password: ${this.password}`);
  }
}
