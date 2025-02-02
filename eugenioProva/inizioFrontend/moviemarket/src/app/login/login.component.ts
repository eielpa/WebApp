import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],  // RouterLink deve essere importato qui
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = "Login page";
  passwordVisible = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  preventCopyPaste(event: KeyboardEvent) {
    const passwordField = event.target as HTMLInputElement;
    if (passwordField && (event.ctrlKey && (event.key === 'c' || event.key === 'v'))) {
      event.preventDefault();
    }
  }
}
