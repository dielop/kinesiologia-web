import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptionService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
  // Obtenemos el token de localstorage
  const token:string = localStorage.getItem('token');
  let request = req;
  
  // Verificamos si el token existe y lo insertamos en la cabecera
  if (token) {
    request = req.clone({
      setHeaders: {
        authorization: `Bearer ${ token }`
      }
    });
  }
    return next.handle(request);
  }

  
}
