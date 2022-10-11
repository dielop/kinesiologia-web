import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { RolesService } from 'src/app/services/roles/roles.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public insertar:any;
  public roles:any; 

  constructor(public dialogRef: MatDialogRef<SignInComponent>,
              @ Inject(MAT_DIALOG_DATA) public data: User,
              private rolesService: RolesService,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.rolesService.getRoles().subscribe(
    { 
      next:res => {
        this.roles = res;
      },
      error: err => {
        this.toast.error(err.error.message, 'Fail', {
          timeOut:3000
        });
      }
    })  
  }

  cancelar(){
    this.dialogRef.close();
  }
}
