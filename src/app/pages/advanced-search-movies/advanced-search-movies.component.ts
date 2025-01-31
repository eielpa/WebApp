import { Component } from '@angular/core';

@Component({
  selector: 'app-advanced-search-movies',
  standalone: true,
  templateUrl: './advanced-search-movies.component.html',
  styleUrls: ['./advanced-search-movies.component.css']
})
export class AdvancedSearchMoviesComponent {
  searchQuery = '';

  searchMovies() {
    if (this.searchQuery.trim().length > 0) {
      console.log('Esegui ricer per:', this.searchQuery);
    } else {
      console.log('Inserisci un titolo per la ricerca!');
    }
  }
}
