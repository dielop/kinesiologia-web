import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Roles } from 'src/app/models/roles';
import { RolesService } from 'src/app/services/roles/roles.service';
import { EliminarComponent } from '../../dialogs/eliminar/eliminar.component';
import { ModificarRolComponent } from '../modificar-rol/modificar-rol.component';
import { NuevoRolComponent } from '../nuevo-rol/nuevo-rol.component';

@Component({
  selector: 'app-listar-roles',
  templateUrl: './listar-roles.component.html',
  styleUrls: ['./listar-roles.component.css']
})
export class ListarRolesComponent implements OnInit {

  roles: any = [];
  displayedColumns: String[] = ['Nombre', 'Acciones'];
  dataSource = new MatTableDataSource<Roles>(this.roles) 

  @ViewChild(MatTable) tabla!: MatTable<Roles>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private rolesService: RolesService,
              public dialog:MatDialog,
              private toast: ToastrService ) { }

  ngOnInit(): void {
    this.cargarRoles();
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

// Cargar roles desde bdd

  cargarRoles(): void {
    this.rolesService.getRoles().subscribe(
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
            
// Eliminar roles

 eliminarRoles(id : string){

  let dialogref = this.dialog.open(EliminarComponent, {
                    width: '300px',                        
                  }) 
  
  dialogref.afterClosed().subscribe( eliminar => {  
    if (eliminar != undefined) {
      this.rolesService.deleteRoles(id).subscribe(
          {
                next:res => {
                  this.toast.success('Rol eliminado con exito', 'OK',{
                  timeOut:3000
                  });
                  this.cargarRoles(); 
                },
                error:err => {
                  this.toast.error(err,"No se pudo eliminar el rol",{
                  timeOut:3000
                  });
                  this.cargarRoles();      
                }
              }
            );
         }
      });   
  }    


  openNuevoRol(){
    let dialogRef = this.dialog.open(NuevoRolComponent, {
      data: this.roles = { idRoles: 0,
                           rolesCod: '',
                           nombreRoles: ''
                         }
    })

    dialogRef.afterClosed().subscribe(rol => {
          if (rol != undefined)
          this.onCreateRol(rol);
    });
  }

  // Metodo que crea rol luego de cerrar la ventana Modal y actualizo
  onCreateRol(rol:Roles): void {
  this.rolesService.saveRoles(rol).subscribe(
    {
        next:data => {
          this.toast.success('Rol creado con exito', 'OK',{
            timeOut:3000
          });
          this.cargarRoles();
        },
        error:err => {
          this.toast.error(err,"No se pudo crear el Rol",{
            timeOut:3000
          });        
          this.cargarRoles();
        }
    });
  }
  
  modificarRoles(id: number){
    this.rolesService.getOneRoles(id).subscribe({
      next: res => {
          this.roles = res;
          let dialogRef = this.dialog.open(ModificarRolComponent, { 
            data: { 
                    idRoles: this.roles.idRoles,
                    rolesCod: this.roles.rolesCod,
                    nombreRoles:  this.roles.nombreRoles,
                  }
                  
          })
      
          dialogRef.afterClosed().subscribe(rol => {
                if (rol != undefined)
                this.onUpdate(id, rol);
          });
      }, 
      error: err => {
      this.toast.error("No se pudo ver el rol");
      this.cargarRoles();
      }
    })

    
  }

  onUpdate(id : number, rol : Roles){
    
    this.rolesService.updateRoles(id, rol).subscribe(
      {
        next:data => {
          this.toast.success("Roles actualizada con exito")      
          this.cargarRoles();
        },
        error:err => {
          this.toast.error("Error al actualizar roles")        
          this.cargarRoles();
        }
    });
  }
}
