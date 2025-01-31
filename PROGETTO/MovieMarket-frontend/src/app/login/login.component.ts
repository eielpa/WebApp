import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post<any>('http://localhost:8080/doLogin', { email: this.email, password: this.password }, { observe: 'response' })
      .subscribe({
        next: (response) => {
          if (response.status === 200) {
            // Redirect to home page after successful login
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.errorMessage = 'Invalid login credentials';
        }
      });
  }
}
