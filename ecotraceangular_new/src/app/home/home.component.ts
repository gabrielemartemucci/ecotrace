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
    
    // Recupera i veicoli dell'utente dal localStorage
    this.vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
  }

  // Metodo vuoto per la funzione di registrazione attività
  onRegisterActivity() {
    // Per ora non fa nulla
  }

  // Metodo vuoto per la navigazione al profilo
  onProfile() {
    this.router.navigate(['/profile']);
    // Per ora non fa nulla
  }
}
