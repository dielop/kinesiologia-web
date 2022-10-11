import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Roles } from 'src/app/models/roles';

@Component({
  selector: 'app-modificar-rol',
  templateUrl: './modificar-rol.component.html',
  styleUrls: ['./modificar-rol.component.css']
})
export class ModificarRolComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModificarRolComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Roles ) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.dialogRef.close();
  }
}
