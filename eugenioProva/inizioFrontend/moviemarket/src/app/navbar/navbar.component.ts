import {Component, HostListener, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories: any[] = [];
  selectedCategoryId: number | null = null;
  isDropdownOpen = false;

  constructor(
      private categoryService: CategoryService,
      private router: Router
  ) {}

  ngOnInit(): void {
    // Carica le categorie per il menu a tendina
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  // Alterna la visibilità del dropdown
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.navbar');
    if (!clickedInside) {
      this.isDropdownOpen = false; // Chiudi il menu se clicchi fuori
    }
  }

  // Viene invocato al click su una categoria: naviga alla pagina del genere
  onCategoryChange(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.router.navigate(['/genre', categoryId]);
    // Chiude il dropdown dopo la selezione
    this.isDropdownOpen = false;
  }

  // Verifica se l'utente è loggato (presenza di un token/sessionId)
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('sessionId');
  }

  // Esegue il logout: rimuove il token e reindirizza alla pagina di login
  logout(): void {
    sessionStorage.removeItem('sessionId');
    this.router.navigate(['/login']);
  }
}
