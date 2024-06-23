import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrl: './trabajador.component.css'
})
export class TrabajadorComponent {
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
 }

}
