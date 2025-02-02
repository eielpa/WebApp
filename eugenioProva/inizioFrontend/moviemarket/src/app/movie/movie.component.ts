import {Component, OnInit} from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { MovieCardComponent } from '../moviecard/moviecard.component';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-movie',
  imports: [CommonModule, NgForOf, MovieCardComponent],
  templateUrl: './movie.component.html',
  standalone: true,
  styleUrl: './movie.component.css'
})
export class MoviesComponent implements OnInit {
  categories: any[] = []; // Lista di generi
  moviesByGenre: { genre: string, movies: any[] }[] = []; // Mappa con film per genere

  constructor(
      private categoryService: CategoryService,
      private movieService: MovieService
  ) {}

  ngOnInit(): void {
    // Ottieni tutti i generi
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories.slice(0, 15); // Limita a 15 generi

      // Per ogni genere, carica i film corrispondenti
      this.categories.forEach((category) => {
        this.movieService.getMoviesByCategory(category.id).subscribe((movies) => {
          this.moviesByGenre.push({ genre: category.name, movies: movies });
        });
      });
    });
  }
}
