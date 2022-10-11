import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Roles } from 'src/app/models/roles';

@Component({
  selector: 'app-nuevo-rol',
  templateUrl: './nuevo-rol.component.html',
  styleUrls: ['./nuevo-rol.component.css']
})
export class NuevoRolComponent implements OnInit {

  public insertar:any; 

  constructor(public dialogRef: MatDialogRef<NuevoRolComponent>,
              @ Inject(MAT_DIALOG_DATA) public data: Roles) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.dialogRef.close();
  }
}
