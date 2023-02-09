import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ObraSocial } from 'src/app/models/obraSocial';
import { ObrasocialService } from 'src/app/services/obra-social/obrasocial.service';
import { ModificarOSComponent } from '../modificar/modificar-OS.component';
import { NuevoOSComponent } from '../nuevo/nuevo-OS.component';
import { EliminarComponent } from '../../dialogs/eliminar/eliminar.component'

@Component({
  selector: 'app-listar-OS',
  templateUrl: './listar-OS.component.html',
  styleUrls: ['./listar-OS.component.css']
})
export class ListarOSComponent implements OnInit {

  obraSocial: any = [];
  displayedColumns: String[] = ['Nombre', 'Plan', 'Pagos', 'Co-Seguros', 'Observaciones', 'Acciones'];
  dataSource = new MatTableDataSource<ObraSocial>(this.obraSocial) 

  @ViewChild(MatTable) tabla!: MatTable<ObraSocial>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private obraSocialService: ObrasocialService,
              public dialog:MatDialog,
              private toast: ToastrService ) { }

  ngOnInit(): void {
    this.cargarObrasSociales();
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

  cargarObrasSociales(): void {
    this.obraSocialService.getObraSocial().subscribe(
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

 eliminarObraSocial(id : string){

  let dialogref = this.dialog.open(EliminarComponent, {
                    width: '300px',                        
                  }) 
  
  dialogref.afterClosed().subscribe( eliminar => {  
    if (eliminar != undefined) {
      this.obraSocialService.deleteObraSocial(id).subscribe(
          {
                next:res => {
                  this.toast.success('Obra social eliminada con exito', 'OK',{
                  timeOut:3000
                  });
                  this.cargarObrasSociales(); 
                },
                error:err => {
                this.toast.error(err,"No se pudo eliminar obra social",{
                  timeOut:3000
                });
                this.cargarObrasSociales();      
                }
              }
            );
         }
      });   
  }    


  openNuevaOS(){
    let dialogRef = this.dialog.open(NuevoOSComponent, {
      data: this.obraSocial = { idObraSocial: 0,
                                nombreObraSocial: '',
                                planObraSocial: '',
                                pagosObraSocial: '',
                                coSegurosObraSocial: '',
                                obsObraSocial: '',
                                created_at: new Date().toISOString
                              },
      width:'40%'
    })

    dialogRef.afterClosed().subscribe(OS => {
          if (OS != undefined)
          this.onCreateOS(OS);
    });
  }

  // Metodo que crea paciente luego de cerrar la ventana Modal y actualizo
  onCreateOS(OS:ObraSocial): void {
  this.obraSocialService.saveObraSocial(OS).subscribe(
    {
        next:data => {
          this.toast.success('Obra social creada con exito', 'OK',{
            timeOut:3000
          });
          this.cargarObrasSociales();
        },
        error:err => {
          this.toast.error(err,"No se pudo crear obra social",{
            timeOut:3000
          });        
          this.cargarObrasSociales();
        }
    });
  }
  
  modificarObraSocial(id: number){
    this.obraSocialService.getOneObraSocial(id).subscribe({
      next: res => {
          this.obraSocial = res;
          console.log(this.obraSocial);
          let dialogRef = this.dialog.open(ModificarOSComponent, { 
            data: { 
                    idObraSocial: this.obraSocial.idObraSocial,
                    nombreObraSocial:  this.obraSocial.nombreObraSocial,
                    planObraSocial: this.obraSocial.planObraSocial,
                    pagosObraSocial: this.obraSocial.pagosObraSocial,
                    coSegurosObraSocial: this.obraSocial.coSegurosObraSocial,
                    obsObraSocial: this.obraSocial.obsObraSocial
                  }
                  
          })
      
          dialogRef.afterClosed().subscribe(OS => {
                if (OS != undefined)
                this.onUpdate(id, OS);
          });
      }, 
      error: err => {
      this.toast.error("No se pudo ver obra social");
      this.cargarObrasSociales();
      }
    })

    
  }

  onUpdate(id : number, OS : ObraSocial){
    //Elimino la fecha en que actualizo porque cuando actualizo no tiene que modificar la fecha
    delete OS.created_at;
    
    this.obraSocialService.updateObraSocial(id, OS).subscribe(
      {
        next:data => {
          this.toast.success("Obra social actualizada con exito")      
          this.cargarObrasSociales();
        },
        error:err => {
          this.toast.error("Error al actualizar obra social")        
          this.cargarObrasSociales();
        }
    });
  }

}
