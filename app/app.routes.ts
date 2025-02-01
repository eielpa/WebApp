import { Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { LoginComponent} from './login/login.component';
import { GenreComponent} from './genre/genre.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'genre/:name', component: GenreComponent }
];
