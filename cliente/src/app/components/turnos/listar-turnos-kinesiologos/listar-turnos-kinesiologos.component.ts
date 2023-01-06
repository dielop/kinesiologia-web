import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Profesional } from 'src/app/models/profesionales';
import { Turnos } from 'src/app/models/turnos';
import { ProfesionalesService } from 'src/app/services/profesionales/profesionales.service';
import { TurnosService } from 'src/app/services/turnos/turnos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-turnos-kinesiologos',
  templateUrl: './listar-turnos-kinesiologos.component.html',
  styleUrls: ['./listar-turnos-kinesiologos.component.css']
})
export class ListarTurnosKinesiologosComponent implements OnInit {
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
              @Inject(MAT_DIALOG_DATA) public prof: Profesional) { }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  // Ingreso o cambio de fecha 
  inputEvent(event: { value: any; }){
    const dia = event.value.getDate();
    const mes = event.value.getMonth()+1;
    const anio = event.value.getFullYear();
    var fechaFinal = anio + "-" + mes + "-" + dia

    // Cargo los turnos reservados
   this.cargarTurnos(fechaFinal);
  }
  changeEvent(event: { value: any; }){
    const dia = event.value.getDate();
    const mes = event.value.getMonth()+1;
    const anio = event.value.getFullYear();
    var fechaFinal = anio + "-" + mes + "-" + dia
    
    // Cargo los turnos reservados
    this.cargarTurnos(fechaFinal);
  }

 // Carga los turnos reservados ...
  cargarTurnos(selected: string): void {
    this.turnosService.getTurnosReservadosKinesiologos(selected).subscribe(
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
