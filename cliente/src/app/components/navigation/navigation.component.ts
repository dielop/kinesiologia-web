import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import decode from 'jwt-decode';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  constructor() { 
    
  }

  ngOnInit(): void {
    this.isAdmin();
  }

  // Inicializo items de navbar
  Turnos = [ { name:"Turnos Reservados",
               url: "/navigation/listar-turnos" }
           ];
  
  Pacientes = [ { name:"Listado Pacientes",
                  url: "/navigation/listar-paciente" }
              ];
  
  Configuraciones: { name: string; url: string; }[]  = [];

  Login = [{ name:"Cerrar sesion",
             url:"/login" }
          ];


  title = 'gestion-pacientes';
  
  mostrarMenuTurnos: boolean = false;
  mostrarMenuPacientes: boolean = false;
  mostrarMenuConfiguraciones: boolean = false;

  // Validacion de carga de menu
  public isAdmin(): void {
    const token = localStorage.getItem('token');
    const tokenInfo:User = decode(token);

    if (tokenInfo.rolesCod == '1'){
      this.Configuraciones = [{ name:"Profesionales",
                        url:"/navigation/listar"},
                      { name:"Obras Sociales",
                        url:"/navigation/listar-OS" },
                      { name:"Usuarios",
                        url:"/navigation/listar-users" },
                      { name:"Roles de usuario",
                        url:"/navigation/listar-roles" },
                      { name:"Localidades",
                        url:"/navigation/listar-localidades" }
                    ];
    }else{
    this.Configuraciones = [{ name:"Profesionales",
                        url:"/navigation/listar"},
                      { name:"Obras Sociales",
                        url:"/navigation/listar-OS" },
                      { name:"Localidades",
                        url:"/navigation/listar-localidades" }
                    ];
    }
  }

  // Limpia el local storage
  removeStorage(){
    localStorage.removeItem('token');
  }

}

