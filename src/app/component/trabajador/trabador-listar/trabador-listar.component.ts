import { Component, ViewChild } from '@angular/core';
import { Trabajador } from '../../../model/trabajador';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TrabajadorService } from '../../../service/trabajador.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../dialogo/dialogo.component';

@Component({
  selector: 'app-trabador-listar',
  templateUrl: './trabador-listar.component.html',
  styleUrl: './trabador-listar.component.css'
})
export class TrabadorListarComponent {

  lista: Trabajador[] = [];
  displayedColumns = [
    'id',
    'nombre',
    'apellido',
    'email',
    'telefono',
    'accion01',
    'accion02',
  ];
  dataSource = new MatTableDataSource<Trabajador>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private trabajadoService: TrabajadorService,
    private router: Router,
    private dialog: MatDialog
  ) {
    console.log('Load Constructor');
  }
  ngOnInit(): void {
    this.trabajadoService.list().subscribe((data) => (this.dataSource.data = data));

    this.trabajadoService.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(DialogoComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(id);
      } else {
        console.log('FALSE');
      }
    });
  }

  delete(id: string) {
    this.trabajadoService.delete(id).subscribe(() => {
      this.trabajadoService.list().subscribe((data) => {
        this.trabajadoService.setList(data);
      });
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
}