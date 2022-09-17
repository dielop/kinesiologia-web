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
                  url: "/listar-paciente" }
              ];

  Configuraciones = [{ name:"Profesionales",
                       url:"/listar"},
                     { name:"Obras Sociales",
                       url:"/listar-OS" }
              ];


  title = 'gestion-pacientes';
  
  mostrarMenuTurnos: boolean = false;
  mostrarMenuPacientes: boolean = false;
  mostrarMenuConfiguraciones: boolean = false;

}
