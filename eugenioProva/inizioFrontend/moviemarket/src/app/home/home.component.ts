import { Component, OnInit } from '@angular/core';
import { MovieService } from "../services/movie.service";
import { CommonModule } from "@angular/common";
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MovieCardComponent } from "../moviecard/moviecard.component";
import {MovieCardTopRatedComponent} from "../moviecard-toprated/moviecard-toprated.component";

@Component({
  selector: 'app-home',
    imports: [
        RouterLink, CommonModule, NavbarComponent, MovieCardComponent, MovieCardTopRatedComponent
    ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = "Benvenuto nella Home Page!";
  recentMovies: any[] = []; // Lista dei film recenti
  topRatedMovies: any[] = []; // Lista dei film con il rating più alto

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // Recupera i film più recenti (ad esempio 10 film)
    this.movieService.getMostRecentMovies(10).subscribe((movies) => {
      console.log(movies);
      this.recentMovies = movies;
    });

    // Recupera i film con il rating più alto
    this.movieService.getMoviesByRating(1.0).subscribe((movies) => {
      this.topRatedMovies = movies;
    });
  }

  /**
   * Scorre il container delle card.
   * @param list Elemento DOM del container (passato tramite template reference)
   * @param direction 'left' o 'right'
   */
  scroll(list: HTMLElement, direction: string) {
    const scrollAmount = 300; // Quantità di pixel da scorrere (regolabile)
    if (direction === 'left') {
      list.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      list.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
