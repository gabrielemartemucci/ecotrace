// src/app/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importa Router per la navigazione

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  vehicles: any;

  constructor(private router: Router) {}  // Inietta Router per la navigazione

  ngOnInit() {
    // Recupera i dati dell'utente dal localStorage
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Dati utente recuperati:', this.user);

    // Recupera i veicoli dell'utente dal localStorage
    this.vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');

  }

  // Metodo vuoto per la funzione di registrazione attività
  onRegisterActivity() {
    // Per ora non fa nulla
  }

  // Metodo vuoto per la navigazione al profilo
  onProfile() {
    //this.user = JSON.parse(localStorage.getItem('user') || '{}');
   // console.log(this.user); // Aggiungi un log per vedere cosa contiene l'oggetto user
    console.log('Dati utente per navigazione:', this.user);
    if (this.user && this.user.name && this.user.email) {
      console.log('Prova');
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/']); // Reindirizza al login se l'utente non è autenticato
    }
  }
//metodo per la navigazione nei veicoli
  onVehicles() {
    this.router.navigate(['/vehicles']);
  }
}
