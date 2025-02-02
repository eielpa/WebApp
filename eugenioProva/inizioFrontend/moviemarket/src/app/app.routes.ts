import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GenreComponent } from './genre/genre.component';
import { MovieComponent } from './movie/movie.component';
import { RecuperoPasswordComponent } from './passwordrecovery/passwordrecovery.component';
import { RegistrationComponent } from './registration/registration.component'; // Importa il RegistrationComponent

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'genre/:name', component: GenreComponent },
  { path: 'movie/:title', component: MovieComponent },
  { path: 'recupero-password', component: RecuperoPasswordComponent },
  { path: 'registration', component: RegistrationComponent } // Aggiungi la rotta per la registrazione
];
