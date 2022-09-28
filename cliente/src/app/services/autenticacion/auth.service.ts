import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = 'http://localhost:3000/api/';

  constructor( private http: HttpClient,
               private jwtHelper: JwtHelperService ) { }

  // logueo de usuario
  public login(user: User) {
    return this.http.post<any>(this.API_URI + 'users/login', user);
  }

  // verifica si el token existe y esta expirado
  isAuth(): Boolean {
    const token = localStorage.getItem('token'); // recupero el token
    
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      console.log('La sesion ha expirado');
      return false;
    }
    return true;
  }

  public getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.API_URI + 'users');
  }

  public addUser(user:User):Observable<User>{
    return this.http.post<any>(this.API_URI + 'users/addUser', user);
  }

}
