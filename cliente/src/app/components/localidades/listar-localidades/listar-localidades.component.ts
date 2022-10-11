import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { localidades } from 'src/app/models/localidades';
import { LocalidadesService } from 'src/app/services/localidades/localidades.service';
import { EliminarComponent } from '../../dialogs/eliminar/eliminar.component';
import { CrearLocalidadesComponent } from '../crear-localidades/crear-localidades.component';
import { ModificarLocalidadesComponent } from '../modificar-localidades/modificar-localidades.component';

@Component({
  selector: 'app-listar-localidades',
  templateUrl: './listar-localidades.component.html',
  styleUrls: ['./listar-localidades.component.css']
})
export class ListarLocalidadesComponent implements OnInit {
  localidades: any = [];
  displayedColumns: String[] = ['Nombre', 'Acciones'];
  dataSource = new MatTableDataSource<localidades>(this.localidades) 

  @ViewChild(MatTable) tabla!: MatTable<localidades>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private localidadesService: LocalidadesService,
              public dialog:MatDialog,
              private toast: ToastrService ) { }

  ngOnInit(): void {
    this.cargarLocalidades();
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

  cargarLocalidades(): void {
    this.localidadesService.getLocalidades().subscribe(
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
            
// Eliminar obra social

 eliminarLocalidad(idLocalidades : string){

  let dialogref = this.dialog.open(EliminarComponent, {
                    width: '300px',                        
                  }) 
  
  dialogref.afterClosed().subscribe( eliminar => {  
    if (eliminar != undefined) {
      this.localidadesService.deleteLocalidades(idLocalidades).subscribe(
          {
                next:res => {
                  this.toast.success('Localidad eliminada con exito', 'OK',{
                  timeOut:3000
                  });
                  this.cargarLocalidades(); 
                },
                error:err => {
                this.toast.error(err,"No se pudo eliminar la localidad",{
                  timeOut:3000
                });
                this.cargarLocalidades();      
                }
              }
            );
         }
      });   
  }    


  openNuevaLocalidad(){
    let dialogRef = this.dialog.open(CrearLocalidadesComponent, {
      data: this.localidades = { idlocalidades: 0,
                                 nombreLocalidades: ''
                               }
    })

    dialogRef.afterClosed().subscribe(loc => {
          if (loc != undefined)
          this.onCreateLocalidades(loc);
    });
  }

  // Metodo que crea paciente luego de cerrar la ventana Modal y actualizo
  onCreateLocalidades(loc:localidades): void {
  this.localidadesService.saveLocalidades(loc).subscribe(
    {
        next:data => {
          this.toast.success('Localidad creada con exito', 'OK',{
            timeOut:3000
          });
          this.cargarLocalidades();
        },
        error:err => {
          this.toast.error(err,"No se pudo crear la localidad",{
            timeOut:3000
          });        
          this.cargarLocalidades();
        }
    });
  }
  
  modificarLocalidad(idLocalidades: number){
    this.localidadesService.getOneLocalidad(idLocalidades).subscribe({
      next: res => {
          this.localidades = res;
          console.log(this.localidades);
          let dialogRef = this.dialog.open(ModificarLocalidadesComponent, { 
            data: { 
                    idLocalidades: this.localidades.idLocalidades,
                    nombreLocalidades:  this.localidades.nombreLocalidades,
                  }
                  
          })
      
          dialogRef.afterClosed().subscribe(loc => {
                if (loc != undefined)
                this.onUpdate(idLocalidades, loc);
          });
      }, 
      error: err => {
      this.toast.error("No se pudo ver la localidad");
      this.cargarLocalidades();
      }
    })

    
  }

  onUpdate(id : number, loc : localidades){
    this.localidadesService.updateLocalidades(id, loc).subscribe(
      {
        next:data => {
          this.toast.success("Localidad actualizada con exito")      
          this.cargarLocalidades();
        },
        error:err => {
          this.toast.error("Error al actualizar localidad")        
          this.cargarLocalidades();
        }
    });
  }

}
