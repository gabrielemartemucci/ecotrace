// home.component.ts

import { Component } from '@angular/core';
import {Router} from "@angular/router";

interface OnInit {
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  vehicles: any;

  constructor(private router: Router) {}

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
    // Per ora non fa nulla
  }
}
