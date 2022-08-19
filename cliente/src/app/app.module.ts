import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ListarPacienteComponent } from './components/pacientes/listar/listar-paciente.component';
import { ModificarPacienteComponent } from './components/pacientes/modificar/modificar-paciente.component';
import { CrearPacienteComponent } from './components/pacientes/crear/crear-paciente.component';
import { DetallePacienteComponent } from './components/pacientes/detalle/detalle-paciente.component';
import { ListarOSComponent } from './components/obrasocial/listar/listar-OS.component';
import { ModificarOSComponent } from './components/obrasocial/modificar/modificar-OS.component';
import { NuevoOSComponent } from './components/obrasocial/nuevo/nuevo-OS.component';
import { NuevoComponent } from './components/profesionales/nuevo/nuevo.component';
import { ListarComponent } from './components/profesionales/listar/listar.component'
import { ModificarComponent } from './components/profesionales/modificar/modificar.component';

// Material angular 
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ListarPacienteComponent,
    ModificarPacienteComponent,
    CrearPacienteComponent,
    DetallePacienteComponent,
    NuevoOSComponent,
    ModificarOSComponent,
    ListarOSComponent,
    NuevoComponent,
    ModificarComponent,
    ListarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule
  ],
  providers: [
    { 
      provide: MatDialogRef,
      useValue: {}
    }, 
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
