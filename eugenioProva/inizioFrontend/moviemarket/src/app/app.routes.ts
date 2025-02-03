import { Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { LoginComponent} from './login/login.component';
import { GenreComponent} from './genre/genre.component';
import { MoviesComponent } from "./movie/movie.component";
import {RegistrationComponent} from "./registration/registration.component";
import { PersonalLibraryComponent } from './personal-library/personal-library.component';
import { MovieSpecificComponent} from "./movie-specific/movie-specific.component";
import { RecuperoPasswordComponent} from "./passwordrecovery/passwordrecovery.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'genre/:name', component: GenreComponent },
  { path: 'films', component: MoviesComponent },
  { path: 'movie/:title', component: MovieSpecificComponent },
  { path: 'recupero-password', component: RecuperoPasswordComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'personal-library', component: PersonalLibraryComponent },

];
