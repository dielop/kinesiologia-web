import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfesionalesService } from 'src/app/services/profesionales/profesionales.service';
import { turnos } from 'src/app/models/turnos';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { Profesional } from 'src/app/models/profesionales';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from 'src/app/models/pacientes';
import { PacientesService } from 'src/app/services/pacientes.service'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-turnos',
  templateUrl: './listar-turnos.component.html',
  styleUrls: ['./listar-turnos.component.css']
})
export class ListarTurnosComponent implements OnInit {
  turnos: turnos[] = [];
  profesionales:Profesional[] = [];
  pacientes:Paciente[] = [];
  selected: Date | null;
  displayedColumns: string[] = ['Hora', 'Paciente', 'Profesionales', 'O.Social'];
  dataSource = new MatTableDataSource<turnos>(this.turnos) 
  datosPacientes:any;
  

  constructor(private profesionalesService: ProfesionalesService,
              private turnosService: TurnosService,
              private pacientesService: PacientesService,
              private toast: ToastrService,
              @ Inject(MAT_DIALOG_DATA) public data: Profesional) { }

  ngOnInit(): void {
    this.cargarProfesionales();
    this.cargarTurnos(this.selected);
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
  cargarTurnos(selected:Date): void {
    console.log(selected);
    //this.fechaFormateada = selected?.toDateString();
    //console.log(this.fechaFormateada);

    this.turnosService.getTurnosReserved(selected).subscribe(
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

  // Busco pacientes ... TODAVIA NO SE SI APLICA ACA
  buscarPaciente(dni:string|number):any {
    this.pacientesService.getPaciente(dni).subscribe(
      {
        next:res=> {
          this.datosPacientes = res;
          //document.getElementById("nombrePaciente").value = this.datosPacientes.nombrePacientes
        },
        error:err => {
          this.toast.error(err.error.message, 'Fail',{
            timeOut:3000
          });
        }
      });
      console.log(this.datosPacientes);
  }

/*
  inicializoTurnos(){
    const horario:String [] = ['07:45', '08:30', '09:15',
                               '10:00', '10:45', '11:30',
                               '12:15','13:00','15:00',
                               '15:45','16:30', '17:15',
                               '18:00','18:45','19:30']

    for(let i = 0; i < horario.length; i++){
      var start:turnos[] = [{
        idTurnos: 0,
        idPacientes: 0,
        idProfesionales: 0,
        idUsers: 0,
        fechaTurno: this.date,
        hora:horario[i],
        obsTurno:''
        }]
    }

    this.dataSource = start;

    //this.dataSource = new MatTableDataSource<turnos>(start)
  }
*/
}

