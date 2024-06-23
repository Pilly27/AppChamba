import { Injectable } from '@angular/core';
import { Trabajador } from '../model/trabajador';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
//const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  //private url = `${base_url}`;
  private url = 'http://localhost:8080/api';
  private listaCambio = new Subject<Trabajador[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get<Trabajador[]>(this.url + '/trabajadores');
  }
  listId(id: number) {
    return this.http.get<Trabajador>(this.url + '/trabajador/' + id);
  }
  insert(trabajador: Trabajador) {
    return this.http.post(this.url + '/trabajador', trabajador);
  }
  update(aut: Trabajador) {
    return this.http.put(this.url + '/trabajador', aut);
  }
  delete(id: string) {
    return this.http.delete(this.url + '/trabajador/' + id);
  }
  setList(listaNueva: Trabajador[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
}
