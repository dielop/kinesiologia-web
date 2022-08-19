import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObraSocial } from 'src/app/models/obraSocial';

@Component({
  selector: 'app-modificar-OS',
  templateUrl: './modificar-OS.component.html',
  styleUrls: ['./modificar-OS.component.css']
})
export class ModificarOSComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModificarOSComponent>,
              @ Inject(MAT_DIALOG_DATA) public data: ObraSocial ) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.dialogRef.close();
  }

}
