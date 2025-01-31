import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { HomeComponent } from './app/components/home/home.component';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

bootstrapApplication(HomeComponent, {
  providers: [
    provideRouter(routes)  // Usa il router per gestire le rotte
  ]
})
  .catch(err => console.error(err));
