import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turnos } from 'src/app/models/turnos';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  API_URI = 'http://localhost:3000/api/';

  constructor(private http:HttpClient ) { }

  public getTurnos(): Observable<Turnos[]> {
    return this.http.get<Turnos[]>(this.API_URI + 'turnos');
  }

  public getOneTurno(id: string|number): Observable<Turnos>{
    return this.http.get<Turnos>(this.API_URI + `turnos/${id}`);
  }

  public saveTurnos(turnos_: Turnos): Observable<any>{
    return this.http.post<any>(this.API_URI + 'turnos', turnos_);
  }

  public deleteTurnos(id: string|number): Observable<void>{
    return this.http.delete<void>(this.API_URI + `turnos/${id}`);
  }

  public updateTurnos(id: string|number , turnos_: Turnos) : Observable<any>{
    return this.http.put<any>(this.API_URI + `turnos/${id}`, turnos_);
  }

  public getTurnosNuevo(dni: string | number): Observable<any>{
    return this.http.get<any>(this.API_URI + `turnos/${dni}`);
  }

  public getTurnosLibres(selected: String, id: String | Number): Observable<any>{
    return this.http.get<any>(this.API_URI + `turnos/turnosLibres/${selected}/${id}`);
  }

  public getTurnosReservadosKinesiologos(selected: string): Observable<any>{
    return this.http.get<any>(this.API_URI + `turnos/turnosKinesiologos/${selected}`);
  }

  public getTurnosReservadosProfesionales(selected: string, id: string | Number): Observable<any>{
    return this.http.get<any>(this.API_URI + `turnos/turnosReservados/${selected}/${id}`);
  }
}
