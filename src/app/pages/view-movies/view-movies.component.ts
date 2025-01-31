import { Component } from '@angular/core';

@Component({
  selector: 'app-view-movies',
  standalone: true,
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css']
})
export class ViewMoviesComponent {
  movies = [
    {
      title: 'Inception',
      director: 'Christopher Nolan',
      description: 'A mind-bending thriller.',
      rating: 9,
      poster: 'path/to/inception.jpg'
    },
    {
      title: 'The Dark Knight',
      director: 'Christopher Nolan',
      description: 'The Joker wreaks havoc on Gotham.',
      rating: 10,
      poster: 'path/to/dark-knight.jpg'
    }
    // Aggiungi altri film alla lista se necessario
  ];
}
