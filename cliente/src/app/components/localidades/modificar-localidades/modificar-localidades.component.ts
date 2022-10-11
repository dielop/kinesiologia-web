import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { localidades } from 'src/app/models/localidades';

@Component({
  selector: 'app-modificar-localidades',
  templateUrl: './modificar-localidades.component.html',
  styleUrls: ['./modificar-localidades.component.css']
})
export class ModificarLocalidadesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModificarLocalidadesComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: localidades ) { }

  ngOnInit(): void {
  }

  cancelar(){
  this.dialogRef.close();
  }

}
