import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],  // RouterLink deve essere importato qui
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  title = "Login page";
  email = "";
  password = "";
  passwordVisible = false;
  errorMessage = "";

  constructor(private loginService: LoginService, private router: Router) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  preventCopyPaste(event: KeyboardEvent) {
    const passwordField = event.target as HTMLInputElement;
    if (passwordField && (event.ctrlKey && (event.key === 'c' || event.key === 'v'))) {
      event.preventDefault();
    }
  }

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = "Inserisci email e password";
      return;
    }

    this.loginService.login(this.email, this.password).subscribe({
      next: (response) => {
        sessionStorage.setItem('sessionId', response.sessionId);
        sessionStorage.setItem('isAdmin', response.isAdmin.toString());
        this.router.navigate(['']);
      },
      error: (err) => {
        this.errorMessage = "Credenziali non valide";
      }
    });
  }

}
