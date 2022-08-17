import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Paciente } from '../../../models/pacientes';
import { PacientesService } from '../../../services/pacientes.service';
import { CrearComponent } from '../crear/crear.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  pacientes: any = [];
  displayedColumns = ['DNI', 'Nombre', 'Apellido','Telefono','Acciones'];
  dataSource = new MatTableDataSource<Paciente>(this.pacientes) 

  @ViewChild(MatTable) tabla!: MatTable<Paciente>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor( private pacienteService: PacientesService,
               public dialog:MatDialog,
               private toast: ToastrService,
               private router: Router,
               private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarPacientes();
  }

  // Paginacion de la tabla y filtrado

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
       const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Cargar pacientes desde bdd

  cargarPacientes(): void {
     this.pacienteService.getPacientes().subscribe(
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

  // Eliminar pacientes

  eliminarPaciente(id : string){
    this.pacienteService.deletePaciente(id).subscribe(
      {
        next:res => {
         this.toast.success('Paciente eliminado con exito', 'OK',{
          timeOut:3000
         });
         this.cargarPacientes(); 
        },
        error:err => {
        this.toast.error(err,"No se pudo eliminar el paciente",{
          timeOut:3000
        });
        this.cargarPacientes();      
       }
      }
    );     
  }

  // Ventana modal para crear paciente

  openDialog(){
    let dialogRef = this.dialog.open(CrearComponent, {
      data: this.pacientes = {  id: 0,
                                dni: '',
                                nombre: '',
                                apellido: '',
                                localidad: '',
                                direccion: '',
                                telefono: '',
                                created_at: new Date()
                                }
    })

    dialogRef.afterClosed().subscribe(pac => {
          if (pac != undefined)
          this.onCreate(pac);
    });
  }

  // Metodo que crea paciente luego de cerrar la ventana Modal y actualizo filas
  onCreate(pac:Paciente): void {

  this.pacienteService.savePaciente(pac).subscribe(
    {
        next:data => {
          this.toast.success('Paciente creado con exito', 'OK',{
            timeOut:3000
           });
          this.cargarPacientes();
        },
        error:err => {
          this.toast.error(err,"No se pudo crear el paciente",{
            timeOut:3000
          });        
          this.cargarPacientes();
        }
    });
  }

}