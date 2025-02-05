import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService, WishlistItem } from '../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: WishlistItem[] = [];
  errorMessage: string = '';

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.wishlistService.getUserWishlist().subscribe({
      next: data => this.wishlist = data,
      error: err => this.errorMessage = 'Errore nel caricamento della wishlist.'
    });
  }


  remove(id: number): void {
    this.wishlistService.removeFromWishlist(id).subscribe({
      next: () => {
        this.wishlist = this.wishlist.filter(item => item.id !== id);
      },
      //error: err => this.errorMessage = 'Errore nella rimozione del film.'

    });
    alert("Elemento rimosso correttamente!");
    window.location.reload();
  }
}