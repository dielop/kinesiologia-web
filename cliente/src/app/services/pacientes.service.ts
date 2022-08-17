import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../models/pacientes'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  API_URI = 'http://localhost:3000/api/';

  constructor(private http:HttpClient ) { }

  public getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.API_URI + 'pacientes');
  }

  public getPaciente(id: string|number): Observable<Paciente>{
    return this.http.get<Paciente>(this.API_URI + `pacientes/${id}`);
  }

  public savePaciente(paciente: Paciente): Observable<any>{
    return this.http.post<any>(this.API_URI + 'pacientes', paciente);
  }

  public deletePaciente(id: string|number): Observable<void>{
    return this.http.delete<void>(this.API_URI + `pacientes/${id}`);
  }

  public updatePaciente(id: string|number , paciente: Paciente) : Observable<any>{
    return this.http.put<any>(this.API_URI + `pacientes/${id}`, paciente);
  }
}
