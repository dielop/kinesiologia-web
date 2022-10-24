import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfesionalesService } from 'src/app/services/profesionales/profesionales.service';
import { turnos } from 'src/app/models/turnos';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { Profesional } from 'src/app/models/profesionales';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from 'src/app/models/pacientes';
import { PacientesService } from 'src/app/services/pacientes.service'

@Component({
  selector: 'app-listar-turnos',
  templateUrl: './listar-turnos.component.html',
  styleUrls: ['./listar-turnos.component.css']
})
export class ListarTurnosComponent implements OnInit {
  turnos: any = [];
  profesionales:any;
  pacientes:any;
  //selected = '';
  //date = new Date().toISOString();
  displayedColumns: string[] = ['Hora', 'Paciente', 'O. Social', 'Observaciones', 'Acciones'];
  dataSource: any;
  data2:Paciente;
  

  constructor(private profesionalesService: ProfesionalesService,
              private turnosService: TurnosService,
              private pacientesService: PacientesService,
              private toast: ToastrService,
              @ Inject(MAT_DIALOG_DATA) public data: turnos) { }

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

  // Carga los turnos reservados ...
  cargarTurnos(): void {
    this.turnosService.getTurnos().subscribe(
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

  buscarPaciente(dni:string|number):any {
    this.pacientesService.getPaciente(dni).subscribe(
      {
        next:res=> {
          this.data2 = res;
        },
        error:err => {
          this.toast.error(err.error.message, 'Fail',{
            timeOut:3000
          });
        }
      });
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

