import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Cliente } from '../../../model/cliente';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClienteService } from '../../../service/cliente.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../dialogo/dialogo.component';

@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrl: './cliente-listar.component.css'
})
export class ClienteListarComponent implements OnInit{
  lista: Cliente[] = [];
  displayedColumns = [
    'id',
    'nombre',
    'apellido',
    'email',
    'telefono',
    'accion01',
    'accion02',
  ];
  dataSource = new MatTableDataSource<Cliente>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private dialog: MatDialog
  ) {
    console.log('Load Constructor');
  }
  ngOnInit(): void {
    this.clienteService
      .list()
      .subscribe((data) => (this.dataSource.data = data));

    this.clienteService.getList().subscribe((data) => {
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
    this.clienteService.delete(id).subscribe(() => {
      this.clienteService.list().subscribe((data) => {
        this.clienteService.setList(data);
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
