import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { CategoryService } from '../services/category.service';
import { MovieCardComponent } from "../moviecard/moviecard.component";
import { NgForOf } from "@angular/common";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  standalone: true,
  imports: [
    MovieCardComponent,
    NgForOf,
    NavbarComponent
  ],
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genre: string | null = null; // Mantieni 'null' per garantire che non sia una stringa vuota
  movies: any[] = [];
  selectedCategoryId: number | null | undefined;

  constructor(
      private route: ActivatedRoute,
      private movieService: MovieService,
      private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedCategoryId = Number(params.get('name')); // Recupera l'ID dalla rotta

      if (this.selectedCategoryId) {
        // Recupera il nome del genere dalla categoria
        this.categoryService.getCategoryNameById(this.selectedCategoryId).subscribe((categoryName: string) => {
          this.genre = categoryName;  // Assegna il nome del genere
        });

        // Recupera i film per categoria
        this.movieService.getMoviesByCategory(this.selectedCategoryId).subscribe((data: any) => {
          this.movies = data;  // Assegna i film recuperati
        });
      }
    });
  }
}
