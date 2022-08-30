import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Profesional } from 'src/app/models/profesionales';
import { ProfesionalesService } from 'src/app/services/profesionales/profesionales.service';
import { ModificarComponent } from '../modificar/modificar.component';
import { NuevoComponent } from '../nuevo/nuevo.component';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  profesional: any = [];
  displayedColumns = ['DNI', 'Nombre', 'Apellido','Telefono', 'Especialidad', 'Acciones'];
  dataSource = new MatTableDataSource<Profesional>(this.profesional) 

  @ViewChild(MatTable) tabla!: MatTable<Profesional>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor( private profesionalesService: ProfesionalesService,
               public dialog:MatDialog,
               private toast: ToastrService) { }

  ngOnInit(): void {
    this.cargarProfesionales();
  }

  // Paginacion de la tabla y filtrado
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }


  // Cargar pacientes desde bdd
 cargarProfesionales(): void {
     this.profesionalesService.getProfesionales().subscribe(
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

  eliminarProfesional(id : string){
    this.profesionalesService.getOneProfesionales(id).subscribe(
      {
        next:res => {
         this.toast.success('Profesional eliminado con exito', 'OK',{
          timeOut:3000
         });
         this.cargarProfesionales(); 
        },
        error:err => {
        this.toast.error(err,"No se pudo eliminar el profesional",{
          timeOut:3000
        });
        this.cargarProfesionales();      
       }
      }
    );     
  }

  // Ventana modal para crear paciente

  openNuevoProfesional(){
    let dialogRef = this.dialog.open(NuevoComponent, {
      data: this.profesional = {  id: 0,
                                  dni: '',
                                  nombre: '',
                                  apellido: '',
                                  localidad: '',
                                  direccion: '',
                                  telefono: '',
                                  especialidad: '',
                                  created_at: new Date()
                                }
    })

    dialogRef.afterClosed().subscribe(prof => {
          if (prof != undefined)
          this.onCreateProfesional(prof);
    });
  }

  // Metodo que crea paciente luego de cerrar la ventana Modal y actualizo filas
  onCreateProfesional(prof:Profesional): void {
  this.profesionalesService.saveProfesionales(prof).subscribe(
    {
        next:data => {
          this.toast.success('Profesional creado con exito', 'OK',{
            timeOut:3000
           });
          this.cargarProfesionales();
        },
        error:err => {
          this.toast.error(err,"No se pudo crear el profesional",{
            timeOut:3000
          });        
          this.cargarProfesionales();
        }
    });
  }

  modificarProfesional(id: number){
    this.profesionalesService.getOneProfesionales(id).subscribe({
      next: res => {
            this.profesional = res;
            console.log(this.profesional);
            let dialogRef = this.dialog.open(ModificarComponent, { 
              data: { 
                      id: this.profesional.id,
                      dni: this.profesional.dni,
                      nombre:  this.profesional.nombre,
                      apellido: this.profesional.apellido,
                      localidad: this.profesional.localidad,
                      direccion: this.profesional.direccion,
                      telefono: this.profesional.telefono,
                      especailidad: this.profesional.especialidad
                    }
                    
          })
      
          dialogRef.afterClosed().subscribe(prof => {
                if (prof != undefined)
                this.onUpdate(id, prof);
          });
      }, 
      error: err => {
      this.toast.error("No se pudo ver el profesional");
      this.cargarProfesionales();
      }
    })

    
  }

  onUpdate(id : number, prof : Profesional){
    //Elimino la fecha en que actualizo porque cuando actualizo no tiene que modificar la fecha
    delete prof.created_at;
    
    this.profesionalesService.updateProfesionales(id, prof).subscribe(
      {
        next:data => {
          this.toast.success("Profesional actualizado con exito")      
          this.cargarProfesionales();
        },
        error:err => {
          this.toast.error("Error al editar profesional")        
          this.cargarProfesionales();
        }
    });
  }
}