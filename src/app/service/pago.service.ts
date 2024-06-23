import { Injectable } from '@angular/core';
import { Pago } from '../model/pago';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private url = 'http://localhost:8080/api';
  private listaCambio = new Subject<Pago[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get<Pago[]>(this.url + '/pagos');
  }
  listId(id: number) {
    return this.http.get<Pago>(this.url + '/pago/' + id);
  }
  insert(pago: Pago) {
    return this.http.post(this.url + '/pago', pago);
  }
  update(pag: Pago) {
    return this.http.put(this.url + '/pago', pag);
  }
  delete(id: string) {
    return this.http.delete(this.url + '/pago/' + id);
  }
  setList(listaNueva: Pago[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
}



