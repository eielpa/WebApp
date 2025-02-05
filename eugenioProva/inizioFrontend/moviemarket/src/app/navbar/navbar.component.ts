import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Observable } from "rxjs";
import { LoginService, UserInfo } from "../services/login.service";
import { MovieService } from "../services/movie.service";

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();

  onSearch(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    this.searchEvent.emit(searchText); // Invia il testo della ricerca
  }

  categories: any[] = [];
  isDropdownOpen = false;
  userNickname: string | null = null;
  nickname: string | null = '';
  isAdmin: boolean = false; // Flag per mostrare il pulsante "Aggiungi Film"
  // Aggiungi una proprietà per tenere traccia della query di ricerca, se necessario
  searchQuery: string = '';

  constructor(
      private categoryService: CategoryService,
      private loginService: LoginService,
      private router: Router,
      private movieService: MovieService
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
    this.categoryService.setSelectedCategory(categoryId);
    console.log(this.categoryService.getCategoryNameById(categoryId));

    this.router.navigate(['/genre', categoryId]);
    // Chiude il dropdown dopo la selezione
    this.isDropdownOpen = false;
  }

  // Verifica se l'utente è loggato (presenza di un token/sessionId)
  isLoggedIn(): boolean {
    this.nickname=sessionStorage.getItem("userNickname");
    return !!sessionStorage.getItem('sessionId');
  }

  // Esegue il logout: rimuove il token e reindirizza alla pagina di login
  logout(): void {
    sessionStorage.removeItem('sessionId');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('userNickname');
    this.router.navigate(['/auth']);
  }
}
