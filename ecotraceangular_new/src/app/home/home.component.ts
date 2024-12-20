import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../dataservice';
import { Chart } from 'chart.js/auto';
import { subDays, format } from 'date-fns';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  vehicles: any;
  weeklyChart: any;
  monthlyChart: any;
  dailyData7Days: any = [];
  dailyData30Days: any =[];
  co2today: any;
  co2maxday: any;
  co2minday: any;
  maxday: any;
  minday: any;

  constructor(private router: Router, private dataService: DataService) {}  // Inietta Router per la navigazione

  ngOnInit() {
    // Recupera i dati dell'utente dal localStorage
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Dati utente recuperati:', this.user);

    // Recupera i veicoli dell'utente dal localStorage
    this.vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    console.log('Ciao');
    console.log('Dati veicoli recuperati:', this.vehicles);
    this.loadDailyData7Days(this.user.id);
    this.loadDailyData30Days(this.user.id);
    this.getCo2Today(this.user.id);
    this.getCo2MaxDay(this.user.id);
    this.getCo2MinDay(this.user.id);
  }

  onProfile() {
    console.log('Dati utente per navigazione:', this.user);
    if (this.user && this.user.name && this.user.email) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/']);
    }
  }

  onLogout() {
    // Rimuovi i dati dell'utente e dei veicoli dal localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('vehicles');

    // Reindirizza l'utente alla pagina di login
    this.router.navigate(['/']);
  }

  onCO2(): void {
    this.router.navigate(['/co2']);
  }

  loadDailyData7Days(user_id: number): void {
    this.dataService.getDailyCo2EmissionLast7Days(user_id).subscribe((data: any) => {
      const allDates = this.generateDateRange(7);
      this.dailyData7Days = this.mapDataToDates(allDates, data);
      this.createChart(this.dailyData7Days, '7days');
    });
  }

  loadDailyData30Days(user_id: number): void {
    this.dataService.getDailyCo2EmissionLast30Days(user_id).subscribe((data: any) => {
      const allDates = this.generateDateRange(30);
      this.dailyData30Days = this.mapDataToDates(allDates, data);
      this.createChart(this.dailyData30Days, '30days');
    });
  }

  generateDateRange(days: number): string[] {
    const today = new Date();
    const dates: string[] = [];
    for (let i = 0; i < days; i++) {
      const day = subDays(today, i);
      dates.push(format(day, 'yyyy-MM-dd'));
    }
    return dates.reverse();
  }

  mapDataToDates(dates: string[], data: any[]): any[] {
    const dataMap = new Map<string, number>();
    data.forEach(entry => {
      dataMap.set(entry.date, entry.total !== null ? entry.total : 0);
    });

    return dates.map(date => ({
      date: date,
      total: dataMap.get(date) ?? 0
    }));
  }

  createChart(data: any, chartType: string): void {
    const labels = data.map((entry: any) => entry.date);
    const values = data.map((entry: any) => entry.total !== null ? entry.total : 0);

    const ctx = document.getElementById(`${chartType}-chart`) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Emissioni CO2 giornaliere',
          data: values,
          fill: false,
          backgroundColor: '#eeead9',
          borderColor: '#eeead9',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#eeead9',
              font: {
                size: 14,
                weight: 'bold',
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) => {
                return `CO2: ${tooltipItem.raw} g`;
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#eeead9'
            },
            grid: {
              color: '#eeead9'
            },
            title: {
              display: true,
              text: 'Data',
              color: '#eeead9'
            }
          },
          y: {
            ticks: {
              color: '#eeead9'
            },
            grid: {
              color: '#eeead9'
            },
            title: {
              display: true,
              text: 'Emissioni CO2 (g)',
              color: '#eeead9'
            }
          }
        }
      }
    });
  }

  getCo2Today(user_id: number): void {
    this.dataService.getCo2Today(user_id).subscribe(data => {
      this.co2today = data;
    });
  }

  getCo2MaxDay(user_id: number): void {
    this.dataService.getCo2MaxDay(user_id).subscribe(data => {
      this.maxday = data.date;
      this.co2maxday = data.emission;
    });
  }

  getCo2MinDay(user_id: number): void {
    this.dataService.getCo2MinDay(user_id).subscribe(data => {
      this.minday = data.date;
      this.co2minday = data.emission;
    });
  }
}
