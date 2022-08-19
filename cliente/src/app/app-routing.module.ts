import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes a importar
import { ListarPacienteComponent } from './components/pacientes/listar/listar-paciente.component'
import { CrearPacienteComponent } from './components/pacientes/crear/crear-paciente.component'
import { DetallePacienteComponent } from './components/pacientes/detalle/detalle-paciente.component'
import { ModificarPacienteComponent } from './components/pacientes/modificar/modificar-paciente.component'
import { ListarOSComponent } from './components/obrasocial/listar/listar-OS.component';
import { ModificarOSComponent } from './components/obrasocial/modificar/modificar-OS.component';
import { NuevoOSComponent } from './components/obrasocial/nuevo/nuevo-OS.component';
import { ListarComponent } from './components/profesionales/listar/listar.component';
import { ModificarComponent } from './components/profesionales/modificar/modificar.component';
import { NuevoComponent } from './components/profesionales/nuevo/nuevo.component';

const routes: Routes = [

  {path: '', component: ListarPacienteComponent, pathMatch:'full' },
  {path: 'listar-paciente', component: ListarPacienteComponent},
  {path: 'crear-paciente', component: CrearPacienteComponent},
  {path: 'modificar-paciente/:id', component: ModificarPacienteComponent},
  {path: 'detalle-paciente/:id', component: DetallePacienteComponent},
  {path: 'listar-OS', component: ListarOSComponent},
  {path: 'crear-OS', component: NuevoOSComponent},
  {path: 'modificar-OS/:id', component: ModificarOSComponent},
  {path: 'listar', component: ListarComponent},
  {path: 'crear', component: NuevoComponent},
  {path: 'modificar/:id', component: ModificarComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
