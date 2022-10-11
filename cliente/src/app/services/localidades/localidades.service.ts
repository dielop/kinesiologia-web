import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { localidades } from 'src/app/models/localidades';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {

  API_URI = 'http://localhost:3000/api/';

  constructor(private http:HttpClient ) { }

  public getLocalidades(): Observable<localidades[]> {
    return this.http.get<localidades[]>(this.API_URI + 'localidades');
  }

  public getOneLocalidad(id: string|number): Observable<localidades>{
    return this.http.get<localidades>(this.API_URI + `localidades/${id}`);
  }

  public saveLocalidades(localidades: localidades): Observable<any>{
    return this.http.post<any>(this.API_URI + 'localidades', localidades);
  }

  public deleteLocalidades(idLocalidades: string|number): Observable<void>{
    return this.http.delete<void>(this.API_URI + `localidades/${idLocalidades}`);
  }

  public updateLocalidades(id: string|number , localidades: localidades) : Observable<any>{
    return this.http.put<any>(this.API_URI + `localidades/${id}`, localidades);
  }
}
