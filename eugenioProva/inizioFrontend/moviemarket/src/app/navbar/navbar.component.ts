import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  categories: any[] = [];
  selectedCategoryId: number | null = null; // Variabile per memorizzare l'ID della categoria selezionata

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

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onCategoryChange(event: any): void {
    this.selectedCategoryId = event.target.value;// Memorizza l'ID selezionato
    this.router.navigate(['/genre', this.selectedCategoryId]); // Naviga alla pagina del genere
  }
}

