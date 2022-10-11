import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from '../../../models/pacientes';
import { ObrasocialService } from 'src/app/services/obra-social/obrasocial.service';
import { ToastrService } from 'ngx-toastr';
import { LocalidadesService } from 'src/app/services/localidades/localidades.service';

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css']
})
export class CrearPacienteComponent implements OnInit {

  public insertar:any; 
  public obrasSociales:any = [];
  public localidades:any = [];
  
  constructor(public dialogRef: MatDialogRef<CrearPacienteComponent>,
              @ Inject(MAT_DIALOG_DATA) public data: Paciente,
              private obraSocialService : ObrasocialService,
              private localidadesService: LocalidadesService,
              private toast: ToastrService ) { }

  ngOnInit(): void {
    this.cargarObrasSociales();
    this.cargarLocalidades();
  }

  cargarObrasSociales(): void {
    this.obraSocialService.getObraSocial().subscribe(
      {
        next:res => {
          this.obrasSociales = res;
        },
        error:err => {
          this.toast.error(err.error.message, 'Fail', {
            timeOut:3000
          });
        }
    });
  }

 cargarLocalidades(): void {
  this.localidadesService.getLocalidades().subscribe(
    {
      next:res => {
        this.localidades = res;
      },
      error: err => {
        this.toast.error(err.error.message, 'Fail', {
          timeOut:3000
        });
      }
    });
 }

  cancelar(){
    this.dialogRef.close();
  }
  
}
