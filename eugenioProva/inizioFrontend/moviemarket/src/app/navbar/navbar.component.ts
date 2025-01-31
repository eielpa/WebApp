import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  genres = ['Azione', 'Drammatico', 'Commedia', 'Fantascienza', 'Horror', 'Thriller', 'Animazione'];
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
