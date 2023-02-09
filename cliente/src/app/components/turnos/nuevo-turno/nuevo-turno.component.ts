import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ObraSocial } from 'src/app/models/obraSocial';
import { Profesional } from 'src/app/models/profesionales';
import { Turnos } from 'src/app/models/turnos';
import { ObrasocialService } from 'src/app/services/obra-social/obrasocial.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ProfesionalesService } from 'src/app/services/profesionales/profesionales.service';
import { TurnosService } from 'src/app/services/turnos/turnos.service';

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.css']
})
export class NuevoTurnoComponent implements OnInit {

  datosPacientes:any;
  fechaTurno = new Date();
  fechaFinal:string;
  profesionales: any[];
  hora:any[];
  horariosLibres: [];
  datosObraSocial: ObraSocial;

  constructor(private route: Router,
              private toast: ToastrService,
              private turnosService: TurnosService,
              private pacienteService: PacientesService,
              private profesionalesService: ProfesionalesService,
              private obraSocialService: ObrasocialService,
              @ Inject(MAT_DIALOG_DATA) public prof: Profesional,
              @ Inject(MAT_DIALOG_DATA) public data: Turnos) { }

  ngOnInit(): void {
    this.cargarProfesionales();
  }

  // Carga profesionales ...
  cargarProfesionales(): void {
    this.profesionalesService.getProfesionales().subscribe(
     {
       next:res => {
         this.profesionales = res;
       },
       error:err => {
         this.toast.error(err.error.message, 'Fail', {
           timeOut:3000
         });
       }
     });
  }

   // Busco pacientes ... TODAVIA NO SE SI APLICA ACA
  buscarPaciente(dni:string|number):any {
    this.pacienteService.getPaciente(dni).subscribe(
      {
        next:res => {
          this.datosPacientes = res;
          this.obraSocialService.getOneObraSocial(this.datosPacientes.idObraSocial).subscribe(
            {
              next:resObraSoc =>{
                this.datosObraSocial = resObraSoc;
              },
              error: err => {
                this.toast.error(err.error.message, 'Fail', {
                  timeOut:3000
                })
              }
            }
          )
        },
        error:err => {
          this.toast.error(err, 'No se encontro paciente con el DNI ingresado',{
            timeOut:3000
          });
        }
      });
  }

  // Ingreso o cambio de fecha 
  inputEvent(event: { value: any; }){
    const dia = event.value.getDate();
    const mes = event.value.getMonth()+1;
    const anio = event.value.getFullYear();
    this.fechaFinal = anio + "-" + mes + "-" + dia
  }
  
  changeEvent(event: { value: any; }){
    const dia = event.value.getDate();
    const mes = event.value.getMonth()+1;
    const anio = event.value.getFullYear();
    this.fechaFinal = anio + "-" + mes + "-" + dia
  }

  // metodo que carga turnos libres ...
  public async cargarTurnosLibres():Promise<any>{
    this.cargarTurnos(this.fechaFinal, this.prof.idProfesionales);   
  }

  cargarTurnos(selected:String, id:String|Number): any{

    this.turnosService.getTurnosLibres(selected,id).subscribe(
      {
        next:res => {
          this.horariosLibres = res;
        },
        error:err => {
          this.toast.error(err.error.message, 'Fail', {
            timeOut:3000
          });
        }
      });
  }

  guardarTurno(paciente: any, profesional:any, hora:any, observacion:any):any {
    //const fechaTmp = Date.parse(this.fechaFinal);
    //const fecha = new Date(fechaTmp);

    // valido si el usuario ingreso el horario
    if (hora == null){
      return ( this.toast.error("No se puede dar de alta un turno sin horario seleccionado."));
    }

    const turno:Turnos = {  idPacientes: paciente,
                            idProfesionales: profesional,
                            idUsers: 1,
                            fechaTurno: this.fechaFinal,
                            hora: hora,
                            obsTurno: observacion,
                            turnoAsistido: 0
                          }
    
    this.turnosService.saveTurnos(turno).subscribe({
      next:data => {
        this.toast.success('Turno creado con exito, espere un momento.', 'OK',{
          timeOut:3000,
        });
        setTimeout(() => location.reload(),  3000);
      },
      error:err => {
        this.toast.error(err,"No se pudo dar de alta el turno. Vuelva a intentar",{
          timeOut:3000
        });
        setTimeout(() => location.reload(),  3000);  
      }
    })
  }

  cancelar(){
    location.reload();
  }
}

