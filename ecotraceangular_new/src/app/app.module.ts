// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';  // Importa HomeComponent
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

// Definisci le rotte
const routes: Routes = [
  { path: '', component: LoginComponent },  // La rotta principale che porta al login
  { path: 'register', component: RegisterComponent },  // La rotta per la registrazione
  { path: 'home', component: HomeComponent },  // Aggiungi la rotta per la home
  { path: 'profile', component: UserProfileComponent }, // Profilo dell'utente
  { path: 'vehicles', component: VehiclesComponent },  // Aggiungi la rotta per i veicoli
  { path: '**', redirectTo: localStorage.getItem('user') ? '/home' : '' },


];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserProfileComponent,
    VehiclesComponent // Assicurati che HomeComponent sia dichiarato
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Configura il routing
    FormsModule, // Configura FormsModule per ngModel
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
