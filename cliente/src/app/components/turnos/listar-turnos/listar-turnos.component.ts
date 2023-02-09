import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfesionalesService } from 'src/app/services/profesionales/profesionales.service';
import { Turnos } from 'src/app/models/turnos';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { Profesional } from 'src/app/models/profesionales';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-listar-turnos',
  templateUrl: './listar-turnos.component.html',
  styleUrls: ['./listar-turnos.component.css']
})

export class ListarTurnosComponent implements OnInit {
  turnos: any = [];
  profesionales:any = [];
  pacientes:any= [];
  turno_aux: Turnos;
  displayedColumns: string[] = ['Hora', 'Paciente', 'Profesionales', 'O.Social', 'Acciones'];
  dataSource = new MatTableDataSource<Turnos>(this.turnos);
  picker:Date;
  startDate = new Date();
  auxiliar: String|Number;
  fechaFinalisima:any;
  marcoVerde:Boolean;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private profesionalesService: ProfesionalesService,
              private turnosService: TurnosService,
              private toast: ToastrService,
              public dialog:MatDialog,
              @ Inject(MAT_DIALOG_DATA) public prof: Profesional) { }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.cargarProfesionales();
  }

  // Ingreso o cambio de fecha 
  inputEvent(event: { value: any; }){
    const dia = event.value.getDate();
    const mes = event.value.getMonth()+1;
    const anio = event.value.getFullYear();
    
    if(mes < 10){
      var _mes = "0" + mes;
    }else{
     _mes = mes;
    }
    var fechaFinal = anio + "-" + _mes + "-" + dia

    // Cargo los turnos reservados
   this.cargarTurnos(fechaFinal, this.prof.idProfesionales);
  }

  changeEvent(event: { value: any; }){
    const dia = event.value.getDate();
    const mes = event.value.getMonth()+1;
    const anio = event.value.getFullYear();
    
    if(mes < 10){
      var _mes = "0" + mes;
    }else{
     _mes = mes;
    }
    var fechaFinal = anio + "-" + _mes + "-" + dia
    
    // Cargo los turnos reservados
    this.cargarTurnos(fechaFinal, this.prof.idProfesionales);
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

 // Carga los turnos reservados ...
  cargarTurnos(selected: string, id:string|Number): void {
    this.auxiliar = id;
    this.turnosService.getTurnosReservadosProfesionales(selected,id).subscribe(
    {
      next:res => {
        this.dataSource.data = res;
      },
      error:err => {
        this.toast.error(err.error.message, 'Fail', {
          timeOut:3000
        });
      }
    });
  }

  // marco asistencia de turno ...
  asistir(id:string|number, assist:number): void {
    this.turnosService.getOneTurno(id).subscribe({
      next: res => {
        this.turno_aux = res;

        // formateo fecha ...
        var fechaFinal = this.formateoFecha(this.turno_aux.fechaTurno);
        this.fechaFinalisima = fechaFinal;

        // cargo turno con datos nuevos ...
        const turno_asistencia:Turnos = {  
          idPacientes: this.turno_aux.idPacientes,
          idProfesionales: this.turno_aux.idProfesionales,
          idUsers: this.turno_aux.idUsers,
          fechaTurno: fechaFinal,
          hora: this.turno_aux.hora,
          obsTurno: this.turno_aux.obsTurno,
          turnoAsistido: assist
        }
        
        // actualizo el turno ...
        this.turnosService.updateTurnos(id, turno_asistencia).subscribe(
          { next:data => {
            this.toast.success('Paciente seleccionado como presente', 'OK',{
              timeOut:3000,
            });
            this.cargarTurnos(fechaFinal, this.prof.idProfesionales);
            this.marcoVerde = true;
          },
          error:err => {
            this.toast.error(err,"No se pudo marcar la asistencia del paciente",{
              timeOut:3000
            });
            this.cargarTurnos(fechaFinal, this.prof.idProfesionales);
          }
          });
      },error: err =>{
        this.toast.error("No se pudo marcar la asistencia");  
      }
    });
    this.cargarTurnos(this.fechaFinalisima, this.prof.idProfesionales);
  }

  // elimino/anulo turno ...
  anular(id:string|number): void{

    this.turnosService.deleteTurnos(id).subscribe(
      {
        next:res => {
        this.toast.success('Turno anulado/eliminado con exito', 'OK',{
          timeOut:3000
        });
        setTimeout(() => location.reload(),  3000);  
        },
        error:err => {
        this.toast.error(err,"No se pudo eliminar/anular el turno",{
          timeOut:3000
        });
        return;   
      }
      });
  }

  // formateo de fecha
  formateoFecha(fecha:any): any{
    var nuevaFecha = new Date(fecha);

    const dia = nuevaFecha.getDate();
    const mes = nuevaFecha.getMonth()+1;
    const anio = nuevaFecha.getFullYear();
    
    if(mes < 10){
      var __mes = "0" + mes;
    }else{
     __mes = String(mes);
    }
    var fechaFinal = anio + "-" + __mes + "-" + dia

    return fechaFinal;
  }
}

