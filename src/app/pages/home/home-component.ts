import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Benvenuto su MovieMarket';
  description = 'Scopri i migliori film, leggi recensioni e esplora nuove uscite!';

  // Array di film consigliati da visualizzare sulla home page
  recommendedMovies = [
    {
      id: 1,
      title: 'Inception',
      description: 'Un film di fantascienza che esplora il sogno e la realtà.',
      release_year: 2010,
      category_id: 1,
      movieImage: 'path/to/inception.jpg'
    },
    {
      id: 2,
      title: 'Interstellar',
      description: 'Un viaggio intergalattico alla ricerca di un nuovo mondo per l\'umanità.',
      release_year: 2014,
      category_id: 1,
      movieImage: 'path/to/interstellar.jpg'
    },
    {
      id: 3,
      title: 'The Dark Knight',
      description: 'Il Cavaliere Oscuro combatte contro il caos portato dal Joker.',
      release_year: 2008,
      category_id: 2,
      movieImage: 'path/to/dark-knight.jpg'
    }
  ];
}
