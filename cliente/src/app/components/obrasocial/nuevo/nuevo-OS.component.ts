import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObraSocial } from 'src/app/models/obraSocial';

@Component({
  selector: 'app-nuevo-OS',
  templateUrl: './nuevo-OS.component.html',
  styleUrls: ['./nuevo-OS.component.css']
})
export class NuevoOSComponent implements OnInit {

  public insertar:any; 

  constructor(public dialogRef: MatDialogRef<NuevoOSComponent>,
              @ Inject(MAT_DIALOG_DATA) public data: ObraSocial) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.dialogRef.close();
  }

}
