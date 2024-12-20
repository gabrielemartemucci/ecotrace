import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';  // Importa HomeComponent
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import {Co2Component} from "./co2/co2.component";
import {AddvehicleComponent} from "./addvehicle/addvehicle.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'co2', component: Co2Component },
  { path: 'addvehicle', component: AddvehicleComponent },

  { path: '**', redirectTo: localStorage.getItem('user') ? '/home' : '' },


];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserProfileComponent,
    VehiclesComponent,
    AddvehicleComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
