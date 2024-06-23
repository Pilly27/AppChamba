import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Oficio } from '../../../model/oficio';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OficioService } from '../../../service/oficio.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../dialogo/dialogo.component';

@Component({
  selector: 'app-oficio-listar',
  templateUrl: './oficio-listar.component.html',
  styleUrl: './oficio-listar.component.css'
})
export class OficioListarComponent implements OnInit{
  lista: Oficio[] = [];
  displayedColumns = [
    'id',
    'nombre',
    'descripcion',
    'accion01',
    'accion02',
  ];
  dataSource = new MatTableDataSource<Oficio>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private oficioService: OficioService,
    private router: Router,
    private dialog: MatDialog
  ) {
    console.log('Load Constructor');
  }
  ngOnInit(): void {
    this.oficioService.list().subscribe((data) => (this.dataSource.data = data));

    this.oficioService.getList().subscribe((data) => {
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
    this.oficioService.delete(id).subscribe(() => {
      this.oficioService.list().subscribe((data) => {
        this.oficioService.setList(data);
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