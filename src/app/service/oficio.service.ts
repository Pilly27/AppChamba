import { Injectable } from '@angular/core';
import { Oficio } from '../model/oficio';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
@Injectable({
  providedIn: 'root'
})
export class OficioService {


  private url = "http://localhost:8080/api";
  private listaCambio = new Subject<Oficio[]>();
  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get<Oficio[]>(this.url + '/oficios');
  }
  listId(id: number) {
    return this.http.get<Oficio>(this.url + '/oficio/' + id);
  }
  insert(oficio: Oficio) {
    return this.http.post(this.url + '/oficio', oficio);
  }
  update(ofi: Oficio) {
    return this.http.put(this.url + '/oficio', ofi);
  }
  delete(id: string) {
    return this.http.delete(this.url + '/oficio/' + id);
  }
  setList(listaNueva: Oficio[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
}