import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EliminarComponent>) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.dialogRef.close();
  }
}
