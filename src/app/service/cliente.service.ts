import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cliente } from '../model/cliente';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

//const base_url = environment.base

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  //private url = `${base_url}`;
  private url = 'http://localhost:8080/api';
  private listaCambio = new Subject<Cliente[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get<Cliente[]>(this.url + '/clientes');
  }
  listId(id: number) {
    return this.http.get<Cliente>(this.url + '/cliente/' + id);
  }
  insert(cliente: Cliente) {
    return this.http.post(this.url + '/cliente', cliente);
  }
  update(cli: Cliente) {
    return this.http.put(this.url + '/cliente', cli);
  }
  delete(id: string) {
    return this.http.delete(this.url + '/cliente/' + id);
  }
  setList(listaNueva: Cliente[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
}
