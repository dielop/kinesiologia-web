import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Paciente } from '../../../models/pacientes';
import { PacientesService } from '../../../services/pacientes.service';
import { CrearPacienteComponent } from '../crear/crear-paciente.component';
import { ToastrService } from 'ngx-toastr';
import { ModificarPacienteComponent } from '../modificar/modificar-paciente.component';
import { EliminarComponent } from '../../dialogs/eliminar/eliminar.component'

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrls: ['./listar-paciente.component.css']
})

export class ListarPacienteComponent implements OnInit {
  pacientes: any = [];
  displayedColumns = ['DNI', 'Nombre', 'Apellido','Telefono','Acciones'];
  dataSource = new MatTableDataSource<Paciente>(this.pacientes) 

  @ViewChild(MatTable) tabla: MatTable<Paciente>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor( private pacienteService: PacientesService,
               public dialog:MatDialog,
               private toast: ToastrService) { }

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

      if(this.dataSource.paginator){
        this.dataSource.paginator.firstPage();
      }
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

    let dialogref = this.dialog.open(EliminarComponent, {
      width: '300px'                       
    })

    // Llamo al dialog, si elimino eliminar no es undefined ...
    
    dialogref.afterClosed().subscribe( eliminar => {  
      if (eliminar != undefined) {
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
    });
  }

  // Ventana modal para crear paciente

  openNuevoPaciente(){
    let dialogRef = this.dialog.open(CrearPacienteComponent, {
      data: this.pacientes = {  idPacientes: 0,
                                dniPacientes: '',
                                nombrePacientes: '',
                                apellidoPacientes: '',
                                idLocalidades: 0,
                                direccionPacientes: '',
                                telefonoPacientes: '',
                                obsPacientes: '',
                                hisClinicaPacientes: '',
                                idObraSocial: 0,
                                nroAfiliadoPacientes: '',
                                created_at: new Date().toISOString
                                },
    width:'40%'
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

  modificarPaciente(dni: number){
    this.pacienteService.getPaciente(dni).subscribe({
      next: res => {
          this.pacientes = res;
          console.log(this.pacientes);
          let dialogRef = this.dialog.open(ModificarPacienteComponent, { 
            data: { 
                    idPacientes: this.pacientes.idPacientes,
                    dniPacientes: this.pacientes.dniPacientes,
                    nombrePacientes:  this.pacientes.nombrePacientes,
                    apellidoPacientes: this.pacientes.apellidoPacientes,
                    idLocalidades: this.pacientes.idLocalidades,
                    direccionPacientes: this.pacientes.direccionPacientes,
                    telefonoPacientes: this.pacientes.telefonoPacientes,
                    obsPacientes: this.pacientes.obsPacientes,
                    hisClinicaPacientes: this.pacientes.hisClinicaPacientes,
                    idObraSocial: this.pacientes.idObraSocial,
                    nroAfiliadoPacientes: this.pacientes.nroAfiliadoPacientes
                  },
            width:'40%'    
          })
      
          dialogRef.afterClosed().subscribe(pac => {
                if (pac != undefined)
                this.onUpdate(dni, pac);
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

