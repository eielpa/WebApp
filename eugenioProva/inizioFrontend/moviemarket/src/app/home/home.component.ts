import { Component, OnInit } from '@angular/core';
import { MovieService} from "../services/movie.service";
import { CommonModule } from "@angular/common";
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import {MovieCardComponent} from "../moviecard/moviecard.component";

@Component({
  selector: 'app-home',
  imports: [
    RouterLink, CommonModule, NavbarComponent, MovieCardComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  title = "Benvenuto nella Home Page!";
  recentMovies: any[] = []; // Lista dei film recenti
  topRatedMovies: any[] = []; // Lista dei film con il rating più alto

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // Recupera i film più recenti (ad esempio 10 film)
    this.movieService.getMostRecentMovies(10).subscribe((movies) => {
      this.recentMovies = movies;
    });

    // Recupera i film con il rating più alto (ad esempio rating >= 8)
    this.movieService.getMoviesByRating(8).subscribe((movies) => {
      this.topRatedMovies = movies;
    });
  }
}