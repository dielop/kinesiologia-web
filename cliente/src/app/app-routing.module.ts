import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes a importar
import {ListarComponent} from './components/pacientes/listar/listar.component'
import {CrearComponent} from './components/pacientes/crear/crear.component'
import {DetalleComponent} from './components/pacientes/detalle/detalle.component'
import {ModificarComponent} from './components/pacientes/modificar/modificar.component'

const routes: Routes = [
  {path: '', component: ListarComponent, pathMatch:'full' },
  {path: 'listar', component: ListarComponent},
  {path: 'crear', component: CrearComponent},
  {path: 'modificar/:id', component: ModificarComponent},
  {path: 'detalle/:id', component: DetalleComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
