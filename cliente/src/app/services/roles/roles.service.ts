import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/models/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  API_URI = 'http://localhost:3000/api/';

  constructor( private http:HttpClient ) { }

  public getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.API_URI + 'roles');
  }

  public getOneRoles(id: string|number): Observable<Roles>{
    return this.http.get<Roles>(this.API_URI + `roles/${id}`);
  }

  public saveRoles(roles: Roles): Observable<any>{
    return this.http.post<any>(this.API_URI + 'roles', roles);
  }

  public deleteRoles(id: string|number): Observable<void>{
    return this.http.delete<void>(this.API_URI + `roles/${id}`);
  }

  public updateRoles(id: string|number , roles: Roles) : Observable<any>{
    return this.http.put<any>(this.API_URI + `roles/${id}`, roles);
  }
}

