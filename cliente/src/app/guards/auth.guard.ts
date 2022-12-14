import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/autenticacion/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService,
               private router: Router) {}

  // Con vencimiento de token evita redigirir rutas
  canActivate() {
    if(!this.authService.isAuth()) {
      console.log('Token invalido o expirado');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
