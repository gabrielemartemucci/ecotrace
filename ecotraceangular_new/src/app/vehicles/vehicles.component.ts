// src/app/vehicles/vehicles.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: any;

  ngOnInit() {
    // Recupera i veicoli dal localStorage
    this.vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
  }

  goBack() {
    window.history.back();  // Torna alla pagina precedente
  }
}
