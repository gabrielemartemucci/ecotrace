import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class VehicleService {
  vehicles : any;

  private apiUrl = 'http://localhost:8080/api/vehicles';

  constructor(private http: HttpClient) {}

  deleteVehicle(id: number): Observable<void> {
    const vehicle = this.vehicles[id];
    if (confirm('Sei sicuro di voler eliminare questo veicolo?')) {
      this.http.delete<void>(`${this.apiUrl}/${vehicle.id}`).subscribe(() => {
        this.vehicles.splice(id, 1);
      }, error => {
        alert('Errore durante l\'eliminazione del veicolo.');
        console.error(error);
      });
    }
    return this.http.delete<void>(`${this.apiUrl}/vehicles/${id}`);
  }
}
