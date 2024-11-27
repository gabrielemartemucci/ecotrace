// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';  // Importa HomeComponent

export const routes: Routes = [
  { path: '', component: LoginComponent },  // La rotta principale che porta al Login
  { path: 'register', component: RegisterComponent },  // La rotta per la registrazione
  { path: 'home', component: HomeComponent },  // Aggiungi la rotta per la home
  // Puoi aggiungere altre rotte in futuro come 'profile', 'activities', ecc.
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
