// src/app/vehicles/vehicles.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";  // Importa Router per il reindirizzamento
import {VehicleService} from '../personalVehiclesservice';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: any;

  constructor(private router: Router, private http: HttpClient, private vehicleService: VehicleService) {}


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

  deleteVehicle(vehicle_id: number): void {
    const confirmed = confirm('Sei sicuro di voler eliminare questo veicolo?');
    if (confirmed) {
      this.vehicleService.deleteVehicle(vehicle_id).subscribe({
        next: () => {
          // Rimuovi il veicolo dall'array locale
          this.vehicles = this.vehicles.filter((vehicle: any) => vehicle.id !== vehicle_id);
          Swal.fire({
            title: 'Veicolo eliminato con successo!',
            html: `
        <p><br><br><em>Veicolo eliminato con successo!</em></p>
      `,
            icon: 'info',
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50'
          });
        },
        error: (err) => {
          console.error('Error deleting vehicle:', err);
          Swal.fire({
            title: 'Veicolo non eliminato con successo!',
            html: `
        <p><br><br><em>Il veicolo non è stato eliminato con successo!<br>Riprova!</em></p>
      `,
            icon: 'info',
            confirmButtonText: 'OK',
            confirmButtonColor: '#4CAF50'
          });
        }
      });
    }
  }
}
