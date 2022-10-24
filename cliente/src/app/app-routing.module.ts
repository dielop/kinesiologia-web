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
import { LoginComponent } from './components/login/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { SignInComponent } from './components/login/sign-in/sign-in.component';
import { ListarUsersComponent } from './components/login/listar/listar-users.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ListarLocalidadesComponent } from './components/localidades/listar-localidades/listar-localidades.component';
import { ModificarLocalidadesComponent } from './components/localidades/modificar-localidades/modificar-localidades.component';
import { CrearLocalidadesComponent } from './components/localidades/crear-localidades/crear-localidades.component';
import { ListarRolesComponent } from './components/roles/listar-roles/listar-roles.component';
import { ModificarRolComponent } from './components/roles/modificar-rol/modificar-rol.component';
import { NuevoRolComponent } from './components/roles/nuevo-rol/nuevo-rol.component';
import { ListarTurnosComponent } from './components/turnos/listar-turnos/listar-turnos.component';

const routes: Routes = [
  
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'navigation', component: NavigationComponent, canActivate: [AuthGuard],
    children: [
              {path: 'listar-paciente', component: ListarPacienteComponent, canActivate: [AuthGuard]},
              {path: 'crear-paciente', component: CrearPacienteComponent, canActivate: [AuthGuard]},
              {path: 'modificar-paciente/:id', component: ModificarPacienteComponent, canActivate: [AuthGuard]},
              {path: 'detalle-paciente/:id', component: DetallePacienteComponent, canActivate: [AuthGuard]},
              {path: 'listar-OS', component: ListarOSComponent, canActivate: [AuthGuard]},
              {path: 'crear-OS', component: NuevoOSComponent, canActivate: [AuthGuard]},
              {path: 'modificar-OS/:id', component: ModificarOSComponent, canActivate: [AuthGuard]},
              {path: 'listar', component: ListarComponent, canActivate: [AuthGuard]},
              {path: 'crear', component: NuevoComponent, canActivate: [AuthGuard]},
              {path: 'modificar/:id', component: ModificarComponent, canActivate: [AuthGuard]},
              {path: 'sign-in', component:SignInComponent, canActivate: [AuthGuard] },
              {path: 'listar-users', component:ListarUsersComponent, canActivate: [AuthGuard] },
              {path: 'listar-localidades', component:ListarLocalidadesComponent, canActivate: [AuthGuard]},
              {path: 'crear-localidades', component:CrearLocalidadesComponent, canActivate: [AuthGuard]},
              {path: 'modificar-localidades', component:ModificarLocalidadesComponent, canActivate: [AuthGuard]},
              {path: 'listar-turnos', component:ListarTurnosComponent, canActivate: [AuthGuard]},
              {path: 'listar-roles', component:ListarRolesComponent, canActivate: [AuthGuard, RoleGuard], data:{expectedRole: '1'} },
              {path: 'modificar-rol', component:ModificarRolComponent, canActivate: [AuthGuard, RoleGuard], data:{expectedRole: '1'} },
              {path: 'nuevo-rol', component:NuevoRolComponent, canActivate: [AuthGuard, RoleGuard], data:{expectedRole: '1'} },
              {path: '**', redirectTo: '', pathMatch: 'full'},
              ],
  }
];

// data: { expectedRole : 'administrador' }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
