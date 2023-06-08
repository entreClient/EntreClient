import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Gestor } from '../models/gestor';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {
  private clienteUrl = 'http://localhost:3000/cliente'
  private gestorUrl = 'http://localhost:3000/gestor'
  private emprendimientoUrl = 'http://localhost:3000/emprendimiento'
  private emprendedorUrl = 'http://localhost:3000/emprendedor'


  //private clienteUrl = 'http://localhost:8080/cliente'
  //private gestorUrl = 'http://localhost:8080/gestor'
  //private emprendimientoUrl = 'http://localhost:8080/emprendimiento'
  //private emprendedorUrl = 'http://localhost:8080/emprendedor'

  constructor(private http:HttpClient) { }

  agregar_cliente(data: any): Observable<any> {
    return this.http.post(this.clienteUrl,data);
  }
  agregar_gestor(data: any): Observable<any>{
    return this.http.post(this.gestorUrl,data);
  }
  agregar_emprendimiento(data: any): Observable<any>{
    return this.http.post(this.emprendimientoUrl,data);
  }
  agregar_emprendedor(data: any): Observable<any> {
    return this.http.post(this.emprendedorUrl,data);
  }

  get_gestor(username: string): Observable<any> {
    return this.http.get<Gestor>(`${this.gestorUrl}?username=${username}`);
  }

 getGestor(username: string, password: string): Observable<string | undefined> {
  return this.http.get<Gestor[]>(`${this.gestorUrl}?username=${username}`).pipe(
    map(response => {
      const gestor = response.find(g => g.password === password);
      return gestor ? gestor.rol : undefined;
    })
  );
}



}


