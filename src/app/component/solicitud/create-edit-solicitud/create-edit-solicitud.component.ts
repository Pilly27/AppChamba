import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Solicitud } from '../../../model/solicitud';
import { SolicitudService } from '../../../service/solicitud.service';
import { Router }from '@angular/router';

@Component({
  selector: 'app-create-edit-solicitud',
  templateUrl: './create-edit-solicitud.component.html',
  styleUrl: './create-edit-solicitud.component.css'
})
export class CreateEditSolicitudComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  solicitud: Solicitud = new Solicitud();
  mensaje: string = "";
  maxFecha: Date = new Date();
  constructor(private solicitudService:SolicitudService, private router:Router){
  }
ngOnInit(): void {
  this.form = new FormGroup(
    {
      id: new FormControl(), 
      nombreSolicitud: new FormControl(), 
      descripcionSolicitud: new FormControl(),
      estadoSolicitud: new FormControl(),
      ubicacionSolicitud: new FormControl(),
    }
  );
}

aceptar(){
  this.solicitud.id = this.form.value['id'];
  this.solicitud.nombre = this.form.value['nombreSolicitud'];
  this.solicitud.descripcion = this.form.value['descripcionSolicitud'];
  this.solicitud.estado = this.form.value['estadoSolicitud'];
  this.solicitud.ubicacion = this.form.value['ubicacionSolicitud'];
  if(this.form.valid){
    console.log(this.solicitud);
    this.solicitudService.insert(this.solicitud).subscribe((data)=>{
      this.solicitudService.list().subscribe((data) => {
        this.solicitudService.setList(data);
      });
    });
    this.router.navigate(['clientes']);
  }
  else {
    this.mensaje = 'Agregue los campos omitidos'
  }
}

}
