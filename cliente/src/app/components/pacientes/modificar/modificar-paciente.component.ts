import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/pacientes';
import { PacientesService } from '../../../services/pacientes.service';

@Component({
  selector: 'app-modificar-paciente',
  templateUrl: './modificar-paciente.component.html',
  styleUrls: ['./modificar-paciente.component.css']
})
export class ModificarPacienteComponent implements OnInit {

  paciente: Paciente = null;

  constructor( public dialogRef: MatDialogRef<ModificarPacienteComponent>,
              @ Inject(MAT_DIALOG_DATA) public data: Paciente ) { }

  ngOnInit(): void {

  }

  cancelar(){
    this.dialogRef.close();
  }

}
