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
  displayedColumns: string[] = ['Hora', 'Paciente', 'Profesionales', 'O.Social'];
  dataSource = new MatTableDataSource<Turnos>(this.turnos);
  picker:Date;
  startDate = new Date();
  auxiliar: String|Number;

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
    var fechaFinal = anio + "-" + mes + "-" + dia

    // Cargo los turnos reservados
   this.cargarTurnos(fechaFinal, this.prof.idProfesionales);
  }
  changeEvent(event: { value: any; }){
    const dia = event.value.getDate();
    const mes = event.value.getMonth()+1;
    const anio = event.value.getFullYear();
    var fechaFinal = anio + "-" + mes + "-" + dia
    
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
}

