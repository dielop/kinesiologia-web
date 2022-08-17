import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/models/pacientes';
import { PacientesService } from '../../../services/pacientes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  paciente: any = null;

  constructor(private toast: ToastrService,
              private activatedRoute: ActivatedRoute,
              private pacienteService: PacientesService,
              private router: Router) { }

  ngOnInit(): void { 
    this.verPaciente();
  }

  verPaciente(){
    const id = this.activatedRoute.snapshot.params['id'];     
    this.pacienteService.getPaciente(id).subscribe(      
     { 
        next: res => {
          this.paciente = res;
        }, 
        error: err => {
          this.toast.error(err.error.message, 'Fail', {
            timeOut:3000
          });
        this.router.navigate(['/']);
        }
      });
    }
    
  volver() : void{
    this.router.navigate(['/']);
  }

}