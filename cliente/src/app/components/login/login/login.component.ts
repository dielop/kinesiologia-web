import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/autenticacion/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  problem: Boolean = false;

  constructor( private authService:AuthService,
               private toast: ToastrService,
               private router : Router ) { }

  ngOnInit(): void {
  }
  
  // Logueo de usuario y local storage
  public login() {

    // Creamos el body
    const user:User = {
      userCod: '',
      username: this.username,
      password: this.password,
      roleId: '',
      created_at: new Date()
    }

    this.authService.login(user).subscribe({
      next: res => {
            localStorage.setItem('token', res.token);
            this.router.navigate(['navigation']);
      },
      error: err => {
        this.problem = true;      
      }
    });
  }

}
