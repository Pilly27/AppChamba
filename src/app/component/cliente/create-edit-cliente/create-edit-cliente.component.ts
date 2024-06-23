import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../../model/cliente';
import { ClienteService } from '../../../service/cliente.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-cliente',
  templateUrl: './create-edit-cliente.component.html',
  styleUrl: './create-edit-cliente.component.css'
})
export class CreateEditClienteComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  cliente: Cliente = new Cliente();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  

  constructor(
    private clienteService: ClienteService,
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
      this.clienteService.listId(this.id).subscribe((data) => {
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
    this.cliente.id = this.form.value['id'];
    this.cliente.nombre = this.form.value['nombre'];
    this.cliente.apellido = this.form.value['apellido'];
    this.cliente.email = this.form.value['email'];
    this.cliente.telefono = this.form.value['telefono'];
    

    if (this.form.valid) {
      if (this.edicion) {
        console.log(this.cliente); //se ve en la herramienta de desarrollador de Chrome
        this.clienteService.update(this.cliente).subscribe((data) => {
          this.clienteService.list().subscribe((data) => {
            this.clienteService.setList(data); //enviando la lista al suscriptor
          });
        });
      } else {
        console.log(this.cliente);
        this.clienteService.insert(this.cliente).subscribe((data) => {
          this.clienteService.list().subscribe((data) => {
            this.clienteService.setList(data);
          });
        });
      }
      this.router.navigate(['clientes/listar']);
    } else {
      this.mensaje = 'Agregue campos omitidos';
    }       
  }
}
