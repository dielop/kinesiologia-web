import { Component } from '@angular/core';
import { AuthService } from './services/autenticacion/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cliente';
  cargarRuta:boolean = false

  constructor(private authService:AuthService){
    this.cargarApp();
  }

  public cargarApp(): void {
    if(this.authService.isAuth()){
      console.log(this.cargarRuta)
      this.cargarRuta = true;
      console.log(this.cargarRuta)
    }
  }
}
