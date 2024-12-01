// src/app/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { environment } from 'src/environments/environment'; //non so cosa sia

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Recupera i dati dell'utente dal localStorage
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }
  

  goToVehicles() {
    this.router.navigate(['/vehicles']);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}

