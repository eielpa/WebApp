import { Component, Input } from '@angular/core';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  @Input() movie: any; // Riceve il film da un componente padre
  purchased: boolean = false; // Controlla se il film è stato acquistato

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    // Controlla se il film è già stato acquistato
    const purchasedMovies = JSON.parse(localStorage.getItem('purchasedMovies') || '[]');
    this.purchased = purchasedMovies.includes(this.movie?.id);
  }

  buyMovie() {
    this.paymentService.createPayment(5, 'USD').subscribe(response => {
      if (response && response.links) {
        const approvalUrl = response.links.find((link: any) => link.rel === 'approval_url');
        if (approvalUrl) {
          window.location.href = approvalUrl.href;
        }
      }
    });
  }

  unlockDownload() {
    // Simula l'acquisto salvandolo in localStorage
    const purchasedMovies = JSON.parse(localStorage.getItem('purchasedMovies') || '[]');
    if (!purchasedMovies.includes(this.movie?.id)) {
      purchasedMovies.push(this.movie?.id);
      localStorage.setItem('purchasedMovies', JSON.stringify(purchasedMovies));
      this.purchased = true;
    }
  }

  downloadMovie() {
    alert(`Download di ${this.movie?.title} avviato!`);
  }
}
