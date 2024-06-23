import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pago } from '../../../model/pago';
import { PagoService } from '../../../service/pago.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-pago',
  templateUrl: './create-edit-pago.component.html',
  styleUrl: './create-edit-pago.component.css'
})
export class CreateEditPagoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  pago: Pago = new Pago();
  mensaje: string = "";
  maxFecha: Date = new Date();
  constructor(private pagoService:PagoService, private router:Router){
  }
ngOnInit(): void {
  this.form = new FormGroup(
    {
      id: new FormControl(), 
      nombrePago: new FormControl(), 
      descripcionPago: new FormControl(),
      montoPago: new FormControl(),
    }
  );
}

aceptar(){
  this.pago.id = this.form.value['id'];
  this.pago.nombre = this.form.value['nombrePago'];
  this.pago.descripcion = this.form.value['descripcionPago'];
  this.pago.monto = this.form.value['montoPago'];
  if(this.form.valid){
    console.log(this.pago);
    this.pagoService.insert(this.pago).subscribe((data)=>{
      this.pagoService.list().subscribe((data) => {
        this.pagoService.setList(data);
      });
    });
    this.router.navigate(['listarP']);
  }
  else {
    this.mensaje = 'Agregue los campos omitidos'
  }
}

}
