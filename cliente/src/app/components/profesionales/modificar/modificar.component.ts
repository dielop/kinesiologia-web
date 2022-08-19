import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profesional } from 'src/app/models/profesionales';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModificarComponent>,
              @ Inject(MAT_DIALOG_DATA) public data: Profesional) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.dialogRef.close();
  }

}
