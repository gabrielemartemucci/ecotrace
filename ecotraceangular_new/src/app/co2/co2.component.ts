import { Component } from '@angular/core';
import { FactorsService } from '../factorsservice';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {EmissionService}  from "../emissionservice";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-co2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './co2.component.html',
  styleUrl: './co2.component.css'
})
export class Co2Component {
  personalVehiclesChecked = false;
  transportChecked = false;
  energyChecked = false;
  foodChecked = false;
  transports: any[] = [];
  food: any[] = [];
  energy: any[] = [];
  personalVehicles: any[] = [];
  user: any;
  hasPersonalVehicles = false;
  energyConsumption = null;
  selectedPersonalVehicles: { personalVehicleId: number | null, kilometers: number | null} [] = [];
  selectedTransports: { transportId: number | null, kilometers: number | null} [] = [];
  selectedFood: { foodId: number | null, quantity: number | null} [] = [];

  constructor(private factorService: FactorsService, private emissionService: EmissionService, private router: Router) {}

  ngOnInit(): void {
    this.loadTransports();
    this.loadFood();
    this.loadEnergy();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.personalVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    console.log('Dati veicoli recuperati:', this.personalVehicles);
    this.hasPersonalVehicles = this.personalVehicles.length > 0;
  }


  loadTransports(): void {
    this.factorService.getTransports().subscribe(
      (type) => {
        this.transports = type;
      },
      (error) => {
        console.error('Errore nel recupero dei trasporti', error);
      }
    );
  }

  loadFood(): void {
    this.factorService.getFood().subscribe(
      (type) => {
        this.food = type;
      },
      (error) => {
        console.error('Errore nel recupero dei cibi', error);
      }
    );
  }

  loadEnergy(): void {
    this.factorService.getEnergy().subscribe(
      (type) => {
        this.energy = type;
      },
      (error) => {
        console.error("Errore nel recupero dell'energia", error);
      }
    );
  }

  addPersonalVehicle() {
    this.selectedPersonalVehicles.push({personalVehicleId: null, kilometers: null});
  }

  removePersonalVehicle(index: number) {
    this.selectedPersonalVehicles.splice(index, 1);
  }

  addTransport() {
    this.selectedTransports.push({transportId: null, kilometers: null});
  }

  removeTransport(index: number) {
    this.selectedTransports.splice(index, 1);
  }

  addFood() {
    this.selectedFood.push({foodId: null, quantity: null});
  }

  removeFood(index: number) {
    this.selectedFood.splice(index, 1);
  }

  submitData() {
    const data = {
      personalVehicles: this.selectedPersonalVehicles.map(vehicle => ({
        vehicleId: Number(vehicle.personalVehicleId),
        kilometers: Number(vehicle.kilometers)
    })),
      transports: this.selectedTransports.map(transport => ({
        transportId: Number(transport.transportId),
        kilometers: Number(transport.kilometers)
      })),
      food: this.selectedFood.map(foodEntry => ({
        foodId: Number(foodEntry.foodId),
        quantity: Number(foodEntry.quantity)
      })),
      energy: this.energyChecked ? Number(this.energyConsumption) : 0,
    };
    console.log('Dati inviati:', data);
    console.log('Utente:', this.user.id);
    this.emissionService.calculateEmissions({data: data, id: this.user.id}).subscribe((response: any) => {
      console.log('Total Emissions:', response.response.totalEmissions);
      let message = '';
      for (const transport of this.selectedTransports) {
        const transportId = transport.transportId;
        const kilometres = transport.kilometers;
        if ((transportId == 5 || transportId == 6 || transportId == 7 || transportId == 8 || transportId == 9 || transportId == 12 || transportId == 14 || transportId == 15 || transportId == 16) && (kilometres == null || kilometres <= 1))
          message += response.suggestions[0].suggestion + '<br>';
        if ((transportId == 5 || transportId == 8) && (kilometres == null || kilometres >= 5))
          message += response.suggestions[1].suggestion + '<br>';
        if (transportId == 10 || transportId == 11 || transportId == 15 || transportId == 16)
          message += response.suggestions[2].suggestion + '<br>';
        if (transportId == 12 || transportId == 13 || transportId == 14)
          message += response.suggestions[3].suggestion + '<br>';
        if (transportId == 17)
          message += response.suggestions[4].suggestion + '<br>';
        if (transportId == 18 || transportId == 19)
          message += response.suggestions[5].suggestion + '<br>';
        if (transportId == 20)
          message += response.suggestions[6].suggestion + '<br>';
        if (transportId == 21)
          message += response.suggestions[7].suggestion + '<br>';
        if (transportId == 22)
          message += response.suggestions[8].suggestion + '<br>';
        if (transportId == 23)
          message += response.suggestions[9].suggestions + '<br>';
      }
      if ( this.energyChecked ? (Number(this.energyConsumption) >= 8) : false )
        message += response.suggestions[10].suggestion + '<br>';
      for (const food of this.selectedFood) {
        const foodId = food.foodId;
        const quantity = food.quantity;
        if (foodId == 25 || foodId == 26)
          message += response.suggestions[11].suggestion + '<br>';
        if (foodId == 32)
          message += response.suggestions[12].suggestion + '<br>';
        if (foodId == 45)
          message += response.suggestions[13].suggestion + '<br>';
      }
      Swal.fire({
        title: 'Totale emissioni calcolate',
        html: `
        <p><strong>${response.response.totalEmissions} g CO2</strong></p>
        <p><br><br><em>Suggerimenti:</em><br> ${message}</p>
      `,
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#4CAF50'
      });
      this.router.navigate(['/home']);
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
