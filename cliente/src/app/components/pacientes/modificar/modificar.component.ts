import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/pacientes';
import { PacientesService } from '../../../services/pacientes.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  paciente: Paciente = null;

  constructor(
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute,
              private pacienteService: PacientesService,
              private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.pacienteService.getPaciente(id).subscribe({
      next: data => {
          this.paciente = data;
      }, 
      error: err => {
      this.toastr.error("No se pudo ver el paciente");
      this.router.navigate(['/']);
      }
    });
  }

  onUpdate(){
    const id = this.activatedRoute.snapshot.params['id'];
    //Elimino la fecha en que actualizo porque cuando actualizo no tiene que modificar la fecha
    delete this.paciente.created_at;
    
    this.pacienteService.updatePaciente(id, this.paciente).subscribe(
      {
        next:data => {
          this.toastr.success("Paciente actualizado con exito")      
          this.router.navigate(['/']);
        },
        error:err => {
          this.toastr.error("Error al editar el paciente")        
          this.router.navigate(['/']);
        }
    });
  }

  cancelar() : void{
    this.router.navigate(['/']);
  }

}
