import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./registration.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  private http = inject(HttpClient); // Iniezione di HttpClient con inject()

  constructor() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;

      this.http.post('http://localhost:8080/confirmRegistration', formValues).subscribe({
        next: (response) => {
          console.log('Registrazione riuscita:', response);
          this.registerForm.reset();
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Errore durante la registrazione:', error);
          this.errorMessage = 'Errore nella registrazione. Riprova.';
        }
      });
    } else {
      this.errorMessage = 'Tutti i campi sono obbligatori e validi.';
    }
  }
}
