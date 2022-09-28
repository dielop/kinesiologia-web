import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public insertar:any; 

  constructor(public dialogRef: MatDialogRef<SignInComponent>,
              @ Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.dialogRef.close();
  }
}
