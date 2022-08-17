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
                  url: "/listar" }
              ];

  Profesionales = [ { name:"Listado Profesionales"}
                  ];

  OS = [ { name:"Listado Obras Sociales"}
       ];


  title = 'gestion-pacientes';
  
  siExpandir = true;
  mostrarMenuTurnos: boolean = false;
  mostrarMenuPacientes: boolean = false;
  mostrarMenuProfesionales: boolean = false;
  mostrarMenuOS: boolean = false;

}
