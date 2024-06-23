import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Trabajador } from '../../../model/trabajador';
import { TrabajadorService } from '../../../service/trabajador.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-create-edit-trabajador',
  templateUrl: './create-edit-trabajador.component.html',
  styleUrl: './create-edit-trabajador.component.css'
})
export class CreateEditTrabajadorComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  trabajador: Trabajador = new Trabajador();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  

  constructor(
    private trabajadorService: TrabajadorService,
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
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      telefono: new FormControl(),
    });
  }

  init() {
    if (this.edicion) {
      this.trabajadorService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombre: new FormControl(data.nombre),
          apellido: new FormControl(data.apellido),
          email: new FormControl(data.email),
          telefono: new FormControl(data.telefono)
        });
      });
    }
  }

  aceptar(): void {
    this.trabajador.id = this.form.value['id'];
    this.trabajador.nombre = this.form.value['nombre'];
    this.trabajador.apellido = this.form.value['apellido'];
    this.trabajador.email = this.form.value['email'];
    this.trabajador.telefono = this.form.value['telefono'];
    

    if (this.form.valid) {
      if (this.edicion) {
        console.log(this.trabajador); //se ve en la herramienta de desarrollador de Chrome
        this.trabajadorService.update(this.trabajador).subscribe((data) => {
          this.trabajadorService.list().subscribe((data) => {
            this.trabajadorService.setList(data); //enviando la lista al suscriptor
          });
        });
      } else {
        console.log(this.trabajador);
        this.trabajadorService.insert(this.trabajador).subscribe((data) => {
          this.trabajadorService.list().subscribe((data) => {
            this.trabajadorService.setList(data);
          });
        });
      }
      this.router.navigate(['listarT']);
    } else {
      this.mensaje = 'Agregue campos omitidos';
    }       
  }
}