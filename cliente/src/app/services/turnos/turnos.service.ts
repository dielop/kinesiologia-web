import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { turnos } from 'src/app/models/turnos';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  API_URI = 'http://localhost:3000/api/';

  constructor(private http:HttpClient ) { }

  public getTurnos(): Observable<turnos[]> {
    return this.http.get<turnos[]>(this.API_URI + 'turnos');
  }

  public getOneTurno(id: string|number): Observable<turnos>{
    return this.http.get<turnos>(this.API_URI + `turnos/${id}`);
  }

  public saveTurnos(turnos_: turnos): Observable<any>{
    return this.http.post<any>(this.API_URI + 'turnos', turnos_);
  }

  public deleteTurnos(id: string|number): Observable<void>{
    return this.http.delete<void>(this.API_URI + `turnos/${id}`);
  }

  public updateTurnos(id: string|number , turnos_: turnos) : Observable<any>{
    return this.http.put<any>(this.API_URI + `obrasocial/${id}`, turnos_);
  }

  public getTurnosNuevo(dni: string | number): Observable<any>{
    return this.http.get<any>(this.API_URI + `turnos/${dni}`);
  }

  public getTurnosReserved(selected:Date): Observable<turnos[]>{
    return this.http.get<turnos[]>(this.API_URI + `turnos/turnosReservados/${selected}`);
  }
}
