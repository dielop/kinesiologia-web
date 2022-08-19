import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Paciente } from '../../../models/pacientes';
import { PacientesService } from '../../../services/pacientes.service';
import { CrearPacienteComponent } from '../crear/crear-paciente.component';
import { ToastrService } from 'ngx-toastr';
import { ModificarPacienteComponent } from '../modificar/modificar-paciente.component';

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrls: ['./listar-paciente.component.css']
})
export class ListarPacienteComponent implements OnInit {
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

  openNuevoPaciente(){
    let dialogRef = this.dialog.open(CrearPacienteComponent, {
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
          this.onCreatePaciente(pac);
    });
  }

  // Metodo que crea paciente luego de cerrar la ventana Modal y actualizo filas
  onCreatePaciente(pac:Paciente): void {
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

  modificarPaciente(id: number){
    this.pacienteService.getPaciente(id).subscribe({
      next: res => {
          this.pacientes = res;
          console.log(this.pacientes);
          let dialogRef = this.dialog.open(ModificarPacienteComponent, { 
            data: { 
                    id: this.pacientes.id,
                    dni: this.pacientes.dni,
                    nombre:  this.pacientes.nombre,
                    apellido: this.pacientes.apellido,
                    localidad: this.pacientes.localidad,
                    direccion: this.pacientes.direccion,
                    telefono: this.pacientes.telefono
                  }
                  
          })
      
          dialogRef.afterClosed().subscribe(pac => {
                if (pac != undefined)
                this.onUpdate(id, pac);
          });
      }, 
      error: err => {
      this.toast.error("No se pudo ver el paciente");
      this.cargarPacientes();
      }
    })

    
  }

  onUpdate(id : number, pac : Paciente){
    //Elimino la fecha en que actualizo porque cuando actualizo no tiene que modificar la fecha
    delete pac.created_at;
    
    this.pacienteService.updatePaciente(id, pac).subscribe(
      {
        next:data => {
          this.toast.success("Paciente actualizado con exito")      
          this.cargarPacientes();
        },
        error:err => {
          this.toast.error("Error al editar el paciente")        
          this.cargarPacientes();
        }
    });
  }

}

