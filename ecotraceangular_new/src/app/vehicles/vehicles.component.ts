// src/app/vehicles/vehicles.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importa Router per il reindirizzamento


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: any;

  constructor(private router: Router) {}


  ngOnInit() {
    // Recupera i veicoli dal localStorage
    this.vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
  }

  goToAddvehicle() {
    this.router.navigate(['/addvehicle']);
  }

  goBack() {
    window.history.back();  // Torna alla pagina precedente
  }
}
