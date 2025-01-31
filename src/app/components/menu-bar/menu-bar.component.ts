import { Component } from '@angular/core';

@Component({
    selector: 'app-menu-bar',
    standalone: true,
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
    isLoggedIn = false;
    searchQuery = '';

    toggleLogin() {
        this.isLoggedIn = !this.isLoggedIn;
    }

    searchMovie() {
        console.log('Ricerca film:', this.searchQuery);
    }
}
