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

const routes: Routes = [
  
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: 'navigation', component: NavigationComponent, canActivate: [AuthGuard],
    children: [
              {path: 'listar-paciente', component: ListarPacienteComponent, canActivate: [AuthGuard]},
              {path: 'crear-paciente', component: CrearPacienteComponent, canActivate: [AuthGuard]},
              {path: 'modificar-paciente/:id', component: ModificarPacienteComponent, canActivate: [AuthGuard]},
              {path: 'detalle-paciente/:id', component: DetallePacienteComponent, canActivate: [AuthGuard]},
              {path: 'listar-OS', component: ListarOSComponent, canActivate: [RoleGuard], data: { expectedRole : 'administrador' } },
              {path: 'crear-OS', component: NuevoOSComponent, canActivate: [AuthGuard]},
              {path: 'modificar-OS/:id', component: ModificarOSComponent, canActivate: [AuthGuard]},
              {path: 'listar', component: ListarComponent, canActivate: [AuthGuard]},
              {path: 'crear', component: NuevoComponent, canActivate: [AuthGuard]},
              {path: 'modificar/:id', component: ModificarComponent, canActivate: [AuthGuard]},
              {path: 'sign-in', component:SignInComponent, canActivate: [AuthGuard]},
              {path: 'listar-users', component:ListarUsersComponent, canActivate: [AuthGuard]},
              {path: '**', redirectTo: '', pathMatch: 'full'},
              ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
