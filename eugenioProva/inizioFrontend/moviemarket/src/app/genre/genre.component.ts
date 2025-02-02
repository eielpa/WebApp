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
  genre: string | null = '';
  movies: any[] = [];
  selectedCategoryId: number | null | undefined ;

  constructor(
      private route: ActivatedRoute,
      private movieService: MovieService,
      private categoryService: CategoryService,

) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedCategoryId = Number(params.get('name'));// Recupera l'ID dalla rotta

      console.log(this.selectedCategoryId)
      if (this.selectedCategoryId) {
        this.movieService.getMoviesByCategory(this.selectedCategoryId).subscribe((data: any) => {
          this.movies = data;
        });
      }
    });
  }

}

