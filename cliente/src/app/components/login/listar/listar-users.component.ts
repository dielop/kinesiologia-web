import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/autenticacion/auth.service';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-listar-users',
  templateUrl: './listar-users.component.html',
  styleUrls: ['./listar-users.component.css']
})
export class ListarUsersComponent implements OnInit {

  user: any = [];
  displayedColumns: String[] = [ 'Cod. Usuario' ,'Nombre', 'Roles', 'Acciones'];
  dataSource = new MatTableDataSource<User>(this.user) 

  @ViewChild(MatTable) tabla!: MatTable<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private authService:AuthService,
              public dialog:MatDialog,
              private toast: ToastrService ) { }

  ngOnInit(): void {
    this.userList();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Cargar usuarios desde bdd
  userList(): void {
    this.authService.getUsers().subscribe(
    {
      next:res => {
        this.dataSource.data = res;
      },
      error:err => {
        this.toast.error(err.error.message, 'Fail', {
          timeOut:3000
        });
      }
    });
  }

  // Abre modal para crear nuevo usuario
  openNewUser(){
    let dialogRef = this.dialog.open(SignInComponent, {
      data: this.user = { id: 0,
                          userCod: '',
                          username: '',
                          password: '',
                          roleId: '',
                          created_at: new Date().toISOString
                              }
    })

    dialogRef.afterClosed().subscribe(resUser => {
          if (resUser != undefined)
          this.onCreateOS(resUser);
    });
  }

  // Metodo que crea paciente luego de cerrar la ventana Modal y actualizo
  onCreateOS(resUser:User): void {
  this.authService.addUser(resUser).subscribe(
    {
        next:data => {
          this.toast.success('Usuario creada con exito', 'OK',{
            timeOut:3000
          });
          this.userList();
        },
        error:err => {
          this.toast.error(err,"No se pudo crear el usuario",{
            timeOut:3000
          });        
          this.userList();
        }
    });
  }

}
