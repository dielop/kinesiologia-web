import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { localidades } from 'src/app/models/localidades';

@Component({
  selector: 'app-crear-localidades',
  templateUrl: './crear-localidades.component.html',
  styleUrls: ['./crear-localidades.component.css']
})
export class CrearLocalidadesComponent implements OnInit {

  public insertar:any; 

  constructor(public dialogRef: MatDialogRef<CrearLocalidadesComponent>,
              @ Inject(MAT_DIALOG_DATA) public data: localidades) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.dialogRef.close();
  }

}
