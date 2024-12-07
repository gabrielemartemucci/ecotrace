import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrl: './addvehicle.component.css'
})
export class AddvehicleComponent {

  vehicleName: string = '';
  vehicleType: string = '';
  co2Emission: number = 0; //0 è il valore iniziale

  vehicleTypes: string[] = ['Auto a benzina', 'Auto a metano', 'Auto gpl', 'Auto a diesel', 'Auto elettrica', 'Monopattino elettrico', 'Bicicletta elettrica', 'Monopattino NON elettrico', 'Bicicletta NON elettrica', 'Ciclomotore', 'Motociclo', 'Veicolo commerciale leggero', 'Camion'];

  submitForm() {
    // Qui puoi gestire i dati del form (es. inviarli a un servizio o quello che sia che serve a noi Gabrie tu lo sai!)
    console.log('Nome veicolo:', this.vehicleName);
    console.log('Tipo di veicolo:', this.vehicleType);
    console.log('Emissione CO2:', this.co2Emission);
  }
}

