import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/autenticacion/auth.service';

import decode from 'jwt-decode';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {
  
  constructor(private authService:AuthService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot){
    // Inicializo o recupero variables
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');
  
    const tokenInfo:User = decode(token);

    // Validacion token y roles
    if(!this.authService.isAuth() || tokenInfo.roleId != expectedRole){
      console.log('usuario no autorizado para la vista.');
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
  
}
