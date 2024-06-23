import { Injectable } from '@angular/core';
import { Solicitud } from '../model/solicitud';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private url = 'http://localhost:8080/api';
  private listaCambio = new Subject<Solicitud[]>();

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get<Solicitud[]>(this.url + '/solicitudes');
  }
  listId(id: number) {
    return this.http.get<Solicitud>(this.url + '/solicitud/' + id);
  }
  insert(solicitud: Solicitud) {
    return this.http.post(this.url + '/solicitud', solicitud);
  }
  update(sol: Solicitud) {
    return this.http.put(this.url + '/solicitud', sol);
  }
  delete(id: string) {
    return this.http.delete(this.url + '/solicitud/' + id);
  }
  setList(listaNueva: Solicitud[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
}

