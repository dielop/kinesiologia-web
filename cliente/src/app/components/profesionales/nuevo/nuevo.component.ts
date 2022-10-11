import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Profesional } from 'src/app/models/profesionales';
import { LocalidadesService } from 'src/app/services/localidades/localidades.service';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  public insertar:any;
  public localidades:any; 

  constructor(public dialogRef: MatDialogRef<NuevoComponent>,
              @ Inject(MAT_DIALOG_DATA) public data: Profesional,
                private localidadesService: LocalidadesService,
                private toast: ToastrService) { }

  ngOnInit(): void {
    this.cargarLocalidades();
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
    })  
  }

  cancelar(){
    this.dialogRef.close();
  }

}
