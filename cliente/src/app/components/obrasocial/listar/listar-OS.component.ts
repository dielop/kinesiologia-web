import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ObraSocial } from 'src/app/models/obraSocial';
import { ObrasocialService } from 'src/app/services/obra-social/obrasocial.service';
import { ModificarOSComponent } from '../modificar/modificar-OS.component';
import { NuevoOSComponent } from '../nuevo/nuevo-OS.component';

@Component({
  selector: 'app-listar-OS',
  templateUrl: './listar-OS.component.html',
  styleUrls: ['./listar-OS.component.css']
})
export class ListarOSComponent implements OnInit {

  obraSocial: any = [];
  displayedColumns = ['Nombre', 'Acciones'];
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
            
  eliminarObraSocial(id : number){
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

  openNuevaOS(){
    let dialogRef = this.dialog.open(NuevoOSComponent, {
      data: this.obraSocial = { id: 0,
                                nombre: '',
                                created_at: new Date()
                                }
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
                    id: this.obraSocial.id,
                    nombre:  this.obraSocial.nombre,
                  }
                  
          })
      
          dialogRef.afterClosed().subscribe(pac => {
                if (pac != undefined)
                this.onUpdate(id, pac);
          });
      }, 
      error: err => {
      this.toast.error("No se pudo ver obra social");
      this.cargarObrasSociales();
      }
    })

    
  }

  onUpdate(id : number, pac : ObraSocial){
    //Elimino la fecha en que actualizo porque cuando actualizo no tiene que modificar la fecha
    delete pac.created_at;
    
    this.obraSocialService.updateObraSocial(id, pac).subscribe(
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
