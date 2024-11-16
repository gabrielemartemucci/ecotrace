// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
