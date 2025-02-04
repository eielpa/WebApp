import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-aggiungi-film',
  templateUrl: './aggiungi-film.component.html',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  styleUrls: ['./aggiungi-film.component.css']
})
export class AggiungiFilmComponent implements OnInit {
  movie = {
    title: '',
    description: '',
    releaseYear: null,
    categoryId: null,
    rating: null
  };
  categories: Category[] = [];

  constructor(
      private movieService: MovieService,
      private categoryService: CategoryService,
      private router: Router
  ) {}

  ngOnInit(): void {
    // Carica le categorie quando il componente è inizializzato
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;  // Salva le categorie nel componente
      },
      error: (err) => {
        console.error('Errore nel caricamento delle categorie', err);
      }
    });
  }

  // Funzione per inviare il form
  submitForm(): void {
    if (this.isFormValid()) {
      this.movieService.addMovie(this.movie).subscribe({
        next: () => {
          alert('Film aggiunto con successo!');
          this.router.navigate(['/films']);  // Reindirizza alla lista dei film
        },
        error: (err) => {
          console.log(this.movie);
          alert('Errore nell\'aggiungere il film');
          console.error(err);
        }
      });
    } else {
      alert('Per favore, compila tutti i campi correttamente.');
    }
  }

  // Funzione di validazione del form
  isFormValid(): boolean {
    return (
        this.movie.title?.trim() !== '' &&  // Verifica che il titolo non sia vuoto
        this.movie.description?.trim() !== '' &&  // Verifica che la descrizione non sia vuota
        this.movie.releaseYear !== null &&  // Verifica che l'anno di uscita non sia null
        this.movie.categoryId !== null  // Verifica che la categoria non sia null
    );
  }
}
