// home.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  openActivityForm() {
    // Funzione per aprire il form per registrare attività
    console.log('Apertura form attività');
  }

  viewProfile() {
    // Funzione per visualizzare il profilo dell'utente
    console.log('Visualizzazione profilo');
  }
}
