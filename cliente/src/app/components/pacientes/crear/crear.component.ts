import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from '../../../models/pacientes';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  public insertar:any; 
  
  constructor(public dialogRef: MatDialogRef<CrearComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Paciente ) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.dialogRef.close();
  }
}
