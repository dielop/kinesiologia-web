import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from '../../../models/pacientes';

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css']
})
export class CrearPacienteComponent implements OnInit {

  public insertar:any; 
  
  constructor(public dialogRef: MatDialogRef<CrearPacienteComponent>,
              @ Inject(MAT_DIALOG_DATA) public data: Paciente ) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.dialogRef.close();
  }
}
