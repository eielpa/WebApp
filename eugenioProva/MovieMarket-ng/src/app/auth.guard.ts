import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.currentUserValue) {
      return true;  // Permetti l'accesso se l'utente è autenticato
    } else {
      // Se non autenticato, redirigi al login
      window.location.href = '/login';
      return false;
    }
  }
}
