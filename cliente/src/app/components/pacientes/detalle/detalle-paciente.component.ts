import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from 'src/app/models/pacientes';
import { PacientesService } from '../../../services/pacientes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-paciente',
  templateUrl: './detalle-paciente.component.html',
  styleUrls: ['./detalle-paciente.component.css']
})
export class DetallePacienteComponent implements OnInit {

  paciente: Paciente = null;

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