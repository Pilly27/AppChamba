import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud } from '../../../model/solicitud';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SolicitudService } from '../../../service/solicitud.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../../dialogo/dialogo.component';

@Component({
  selector: 'app-solicitud-listar',
  templateUrl: './solicitud-listar.component.html',
  styleUrl: './solicitud-listar.component.css'
})
export class SolicitudListarComponent implements OnInit {

  lista: Solicitud[] = [];
  displayedColumns = [
    'id',
    'nombre',
    'descripcion',
    'estado',
    'ubicacion',
    'accion01',
    'accion02',
  ];
  dataSource = new MatTableDataSource<Solicitud>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private solicitudService: SolicitudService,
    private router: Router,
    private dialog: MatDialog
  ) {
    console.log('Load Constructor');
  }
  ngOnInit(): void {
    this.solicitudService.list().subscribe((data) => (this.dataSource.data = data));

    this.solicitudService.getList().subscribe((data) => {
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
    this.solicitudService.delete(id).subscribe(() => {
      this.solicitudService.list().subscribe((data) => {
        this.solicitudService.setList(data);
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