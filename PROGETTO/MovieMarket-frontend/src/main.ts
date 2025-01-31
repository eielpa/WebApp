import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { RegisterComponent } from './app/registration/registration.component'; // Importa il componente di registrazione
import { LoginComponent } from './app/login/login.component'; // Importa il componente di login
import { HomePageComponent } from './app/home-page/home-page.component'; // Importa la homepage
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));


// Configura le rotte
const routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Aggiungi altre rotte se necessario
];
