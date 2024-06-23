import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Oficio } from '../../../model/oficio';
import { OficioService } from '../../../service/oficio.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-oficio',
  templateUrl: './create-edit-oficio.component.html',
  styleUrl: './create-edit-oficio.component.css'
})
export class CreateEditOficioComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  Oficio: Oficio = new Oficio();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  

  constructor(
    private oficioService: OficioService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    
    });

    this.form = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    });
  }

  init() {
    if (this.edicion) {
      this.oficioService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombre: new FormControl(data.nombre),
          descripcion: new FormControl(data.descripcion),
        });
      });
    }
  }

  aceptar(): void {
    this.Oficio.id = this.form.value['id'];
    this.Oficio.nombre = this.form.value['nombre'];
    this.Oficio.descripcion = this.form.value['descripcion'];
    

    if (this.form.valid) {
      if (this.edicion) {
        console.log(this.Oficio); //se ve en la herramienta de desarrollador de Chrome
        this.oficioService.update(this.Oficio).subscribe((data) => {
          this.oficioService.list().subscribe((data) => {
            this.oficioService.setList(data); //enviando la lista al suscriptor
          });
        });
      } else {
        console.log(this.Oficio);
        this.oficioService.insert(this.Oficio).subscribe((data) => {
          this.oficioService.list().subscribe((data) => {
            this.oficioService.setList(data);
          });
        });
      }
      this.router.navigate(['oficios']);
    } else {
      this.mensaje = 'Agregue campos omitidos';
    }       
  }
}