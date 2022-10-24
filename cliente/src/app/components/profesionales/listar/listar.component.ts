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
import { EliminarComponent } from '../../dialogs/eliminar/eliminar.component'

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


  // Cargar profesionales desde bdd
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

  // Eliminar profesional

  eliminarProfesional(id : string){

    let dialogref = this.dialog.open(EliminarComponent, {
                      width: '300px',                        
                    }) 

    dialogref.afterClosed().subscribe( eliminar => {  
      if (eliminar != undefined) {
        this.profesionalesService.deleteProfesionales(id).subscribe(
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
    });
  }

  // Ventana modal para crear paciente

  openNuevoProfesional(){
    let dialogRef = this.dialog.open(NuevoComponent, {
      data: this.profesional = {  idProfesionales: 0,
                                  dniProfesionales: '',
                                  nombreProfesionales: '',
                                  apellidoProfesionales: '',
                                  idLocalidades: 0,
                                  direccionProfesionales: '',
                                  telefonoProfesionales: '',
                                  especProfesionales: '',
                                  created_at: new Date().toISOString
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
                      idProfesionales: this.profesional.idProfesionales,
                      dniProfesionales: this.profesional.dniProfesionales,
                      nombreProfesionales:  this.profesional.nombreProfesionales,
                      apellidoProfesionales: this.profesional.apellidoProfesionales,
                      idLocalidades: this.profesional.idLocalidades,
                      direccionProfesionales: this.profesional.direccionProfesionales,
                      telefonoProfesionales: this.profesional.telefonoProfesionales,
                      especProfesionales: this.profesional.especProfesionales
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