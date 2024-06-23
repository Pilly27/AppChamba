import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-oficio',
  templateUrl: './oficio.component.html',
  styleUrl: './oficio.component.css'
})
export class OficioComponent implements OnInit{
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
 }

}
