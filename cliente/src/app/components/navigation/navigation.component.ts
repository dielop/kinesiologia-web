import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  constructor() { }

  ngOnInit(): void {
    
  }

  Turnos = [ { name:"Turnos Reservados"}
           ];
  
  Pacientes = [ { name:"Listado Pacientes",
                  url: "/navigation/listar-paciente" }
              ];

  Configuraciones = [{ name:"Profesionales",
                       url:"/navigation/listar"},
                     { name:"Obras Sociales",
                       url:"/navigation/listar-OS" },
                     { name:"Usuarios",
                       url:"/navigation/listar-users" },
                     { name:"Roles de usuario",
                       url:"/navigation" }
              ];
  Login = [{ name:"Cerrar sesion",
             url:"/login" }
          ];


  title = 'gestion-pacientes';
  
  mostrarMenuTurnos: boolean = false;
  mostrarMenuPacientes: boolean = false;
  mostrarMenuConfiguraciones: boolean = false;

}
