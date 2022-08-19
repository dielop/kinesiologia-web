import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profesional } from 'src/app/models/profesionales';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  public insertar:Profesional; 

  constructor(public dialogRef: MatDialogRef<NuevoComponent>,
              @ Inject(MAT_DIALOG_DATA) public data: Profesional) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.dialogRef.close();
  }

}
