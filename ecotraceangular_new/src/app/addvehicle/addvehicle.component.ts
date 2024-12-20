import { Component, OnInit } from '@angular/core';
import { VehicleService } from "../personalVehiclesservice";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrl: './addvehicle.component.css'
})
export class AddvehicleComponent {

  vehicleName: string = '';
  vehicleType: string = '';
  co2Emission: number = 0;
  user: any;

  vehicleTypes: string[] = ['Auto a benzina', 'Auto a metano', 'Auto a GPL', 'Auto a diesel', 'Auto elettrica', 'Monopattino elettrico', 'Bicicletta elettrica', 'Monopattino non elettrico', 'Bicicletta non elettrica', 'Ciclomotore', 'Motociclo', 'Veicolo commerciale leggero', 'Camion'];

  constructor(private vehicleService: VehicleService, private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Dati utente recuperati:', this.user);
  }

  submitForm(vehicleForm: any) {
    console.log('Nome veicolo:', this.vehicleName);
    console.log('Tipo di veicolo:', this.vehicleType);
    console.log('Emissione CO2:', this.co2Emission);
    this.vehicleService.addVehicle({ name: this.vehicleName, type: this.vehicleType, co2_emission: this.co2Emission}, this.user.id).subscribe(
      response => {
        console.log('Veicolo inserito con successo', response);
        const vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
        vehicles.push({
          id: response.id,
          name: this.vehicleName,
          type: this.vehicleType,
          co2_emission: this.co2Emission
        });
        localStorage.setItem('vehicles', JSON.stringify(vehicles));
        Swal.fire({
          title: 'Veicolo inserito con successo!',
          html: `
        <p><strong>Veicolo inserito con successo!</strong></p>
      `,
          icon: 'info',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4CAF50'
        });
        vehicleForm.reset();
      },
      error => {
        console.error('Inserimento fallito', error);
        alert(`Errore: ${error.status} - ${error.error.message || error.message}` || 'Registrazione fallita')
      }
    )
  }

  goBack() {
    this.router.navigate(['/vehicles']);
  }
}

