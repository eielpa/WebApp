import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.css'],

})
export class HomePageComponent {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }
}
