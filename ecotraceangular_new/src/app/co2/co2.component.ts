import { Component } from '@angular/core';
import { FactorsService } from '../factorsservice';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {EmissionService}  from "../emissionservice";


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
  hasPersonalVehicles = false;
  energyConsumption = null;
  selectedPersonalVehicles: { personalVehicleId: number | null, kilometers: number | null} [] = [];
  selectedTransports: { transportId: number | null, kilometers: number | null} [] = [];
  selectedFood: { foodId: number | null, quantity: number | null} [] = [];

  constructor(private factorService: FactorsService, private emissionService: EmissionService) {}

  ngOnInit(): void {
    this.loadTransports();
    this.loadFood();
    this.loadEnergy();
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
    this.emissionService.calculateEmissions(data).subscribe((response: any) => {
      console.log('Total Emissions:', response.totalEmissions);
      alert(`Totale emissioni calcolate: ${response.totalEmissions} g CO2`);
    });
  }
}
