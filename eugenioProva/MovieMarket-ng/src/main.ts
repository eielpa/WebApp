import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { LoginComponent } from './app/components/login/login.component';
import { RegistrationComponent } from './app/components/registration/registration.component';
import { HomeComponent } from './app/components/home/home.component';
import {CommonModule} from '@angular/common';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },

];

bootstrapApplication(HomeComponent, {
  providers: [
    provideRouter(routes)  // Usa il router per gestire le rotte
  ]
})
  .catch(err => console.error(err));
