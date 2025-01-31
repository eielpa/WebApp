import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  reviews = [
    { title: 'Inception', content: 'Amazing movie!', rating: 9 },
    { title: 'The Dark Knight', content: 'Best superhero film!', rating: 10 }
  ];

  addReview() {
    console.log('Aggiungi Recensione');
    // Aggiungi logica per aggiungere una recensione
  }
}
