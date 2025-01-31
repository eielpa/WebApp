import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import {Router, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms'; // Per il routing

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Salva le informazioni dell'utente (opzionale: usa localStorage o una variabile)
        localStorage.setItem('user', JSON.stringify(response));
        // Naviga alla home page
        this.router.navigate(['/home']); //pag principale
      },
      error: (error) => {
        // Gestisci l'errore (ad esempio, mostra un messaggio)
        this.errorMessage = 'Login fallito. Controlla le tue credenziali.';
        console.error('Login error', error);
      }
    });
  }
}
