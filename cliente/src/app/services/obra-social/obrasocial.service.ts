import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObraSocial } from 'src/app/models/obraSocial';

@Injectable({
  providedIn: 'root'
})
export class ObrasocialService {

  API_URI = 'http://localhost:3000/api/';

  constructor(private http:HttpClient ) { }

  public getObraSocial(): Observable<ObraSocial[]> {
    return this.http.get<ObraSocial[]>(this.API_URI + 'obrasocial');
  }

  public getOneObraSocial(id: string|number): Observable<ObraSocial>{
    return this.http.get<ObraSocial>(this.API_URI + `obrasocial/${id}`);
  }

  public saveObraSocial(obraSocial: ObraSocial): Observable<any>{
    return this.http.post<any>(this.API_URI + 'obrasocial', obraSocial);
  }

  public deleteObraSocial(id: string|number): Observable<void>{
    return this.http.delete<void>(this.API_URI + `obrasocial/${id}`);
  }

  public updateObraSocial(id: string|number , obraSocial: ObraSocial) : Observable<any>{
    return this.http.put<any>(this.API_URI + `obrasocial/${id}`, obraSocial);
  }
}
