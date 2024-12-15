import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  private apiUrl = 'http://localhost:8080/api/vehicles';

  constructor(private http: HttpClient) {}

  private getVehiclesFromStorage(): any[] {
    const vehicles =localStorage.getItem('vehicles');
    return vehicles ? JSON.parse(vehicles) : [];
  }

  private saveVehiclesToStorage(vehicles: any[]): void {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }

  deleteVehicle(id: number): Observable<void> {
    const vehicles = this.getVehiclesFromStorage();
    const vehicleIndex = vehicles.findIndex((v: {id: number}) => v.id == id);
    if (vehicleIndex == -1) {
      alert('Veicolo non trovato!');
      return throwError(() => new Error('Veicolo non trovato'));
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        vehicles.splice(vehicleIndex, 1);
        this.saveVehiclesToStorage(vehicles);
      })
    );
  }

  addVehicle(vehicle: { name: string, type: string, co2_emission: number }, user_id: number): Observable<any> {
    const params = new HttpParams().set('id', user_id.toString());
    return this.http.post(`${this.apiUrl}/add`, vehicle, { params });
  }
}
