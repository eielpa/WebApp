import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MovieCardComponent } from '../moviecard/moviecard.component';
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
  categories: any[] = [];  // Lista delle categorie
  selectedCategoryId: number = 0;  // Categoria selezionata

  constructor(
      private movieService: MovieService,
      private categoryService: CategoryService,
      private router: Router
  ) {}

  ngOnInit(): void {
    // Carica i film recenti
    this.movieService.getMostRecentMovies(10).subscribe((movies) => {
      this.recentMovies = movies;
    });

    // Carica i film con il rating più alto
    this.movieService.getMoviesByRating(1.0).subscribe((movies) => {
      this.topRatedMovies = movies;
    });

    // Carica le categorie dal servizio
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  // Gestisce il cambiamento della categoria selezionata
  onCategoryChange(event: any): void {
    const selectedCategoryId = event.target.value;
    this.router.navigate(['/genre', selectedCategoryId]); // Naviga alla pagina del genere
  }
}
