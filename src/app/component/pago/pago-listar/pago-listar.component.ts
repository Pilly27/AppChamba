import { Component, ViewChild } from '@angular/core';
import { Pago } from '../../../model/pago';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PagoService } from '../../../service/pago.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../dialogo/dialogo.component';

@Component({
  selector: 'app-pago-listar',
  templateUrl: './pago-listar.component.html',
  styleUrl: './pago-listar.component.css'
})
export class PagoListarComponent {

  lista: Pago[] = [];
  displayedColumns = [
    'id',
    'nombre',
    'descripcion',
    'monto',
    'accion01',
    'accion02',
  ];
  dataSource = new MatTableDataSource<Pago>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private pagoService: PagoService,
    private router: Router,
    private dialog: MatDialog
  ) {
    console.log('Load Constructor');
  }
  ngOnInit(): void {
    this.pagoService.list().subscribe((data) => (this.dataSource.data = data));

    this.pagoService.getList().subscribe((data) => {
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
    this.pagoService.delete(id).subscribe(() => {
      this.pagoService.list().subscribe((data) => {
        this.pagoService.setList(data);
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