import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesional } from 'src/app/models/profesionales';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalesService {

  API_URI = 'http://localhost:3000/api/';

  constructor( private http:HttpClient ) { }

  public getProfesionales(): Observable<Profesional[]> {
    return this.http.get<Profesional[]>(this.API_URI + 'profesionales');
  }

  public getOneProfesionales(id: string|number): Observable<Profesional>{
    return this.http.get<Profesional>(this.API_URI + `profesionales/${id}`);
  }

  public saveProfesionales(profesional: Profesional): Observable<any>{
    return this.http.post<any>(this.API_URI + 'profesionales', profesional);
  }

  public deleteProfesionales(id: string|number): Observable<void>{
    return this.http.delete<void>(this.API_URI + `profesionales/${id}`);
  }

  public updateProfesionales(id: string|number , profesional: Profesional) : Observable<any>{
    return this.http.put<any>(this.API_URI + `profesionales/${id}`, profesional);
  }
}
