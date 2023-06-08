import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServidorService } from 'src/app/services/servidor.service';
import { Gestor } from 'src/app/models/gestor';
import { getSupportedInputTypes } from '@angular/cdk/platform';
import { Emprendimiento } from 'src/app/models/emprendimiento';
import { of, switchMap } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Emprendedor } from 'src/app/models/emprendedor';
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {
  form_registro: FormGroup;

  gestor: Gestor = new Gestor();
  cliente: Cliente = new Cliente();
  emprendedor: Emprendedor = new Emprendedor();
  emprendimiento: Emprendimiento = new Emprendimiento();



constructor(
  private builder: FormBuilder,
  private servicio: ServidorService
) { 
  this.form_registro = this.builder.group({
    nombre: this.builder.control('', Validators.required),
    apellido: this.builder.control('', Validators.required),
    celular: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    rol: this.builder.control('Cliente'),

    id_usuario: [''],
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),

    nombre_Empresa: [''],
    descripcion: [''],
    rubro: [''],
    
  })
}
  
  asignaciones() {  
      //entidad de gestor //Relacion de uno a uno 
      this.gestor.username = this.form_registro.value.username;
      this.gestor.password = this.form_registro.value.password;
    this.gestor.rol = this.form_registro.value.rol;
    
    if (this.gestor.rol === "Emprendedor") {
      //entidad emprendedor
      this.emprendedor.nombre = this.form_registro.value.nombre;
      this.emprendedor.apellido = this.form_registro.value.apellido;
      this.emprendedor.celular = this.form_registro.value.celular;
      this.emprendedor.email = this.form_registro.value.email;
      this.emprendedor.id_gestor = this.gestor.id;


      this.emprendimiento.nombre_Empresa = this.form_registro.value.nombre_Empresa;
      this.emprendimiento.descripcion = this.form_registro.value.descripcion;
      this.emprendimiento.rubro = this.form_registro.value.rubro;
      this.emprendimiento.id_emprendedor = this.emprendedor.id;

    } else if (this.gestor.rol === "Cliente") {
      this.cliente.nombre = this.form_registro.value.nombre;
      this.cliente.apellido = this.form_registro.value.apellido;
      this.cliente.celular = this.form_registro.value.celular;
      this.cliente.email = this.form_registro.value.email;
      this.cliente.id_gestor = this.gestor.id;
    }
      

  }

  registrarUsuario() {
  this.asignaciones();

  if (this.form_registro.valid) {
    this.servicio.agregar_gestor(this.gestor).pipe(
      switchMap(gestorAgregado => {
        this.gestor.id = gestorAgregado.id; // Asignar la ID del gestor agregado
        if (this.gestor.rol === 'Emprendedor') {
          this.emprendedor.id_gestor = this.gestor.id; // Asignar la ID del gestor al emprendedor
          return this.servicio.agregar_emprendedor(this.emprendedor); // Agregar emprendedor
        } else {
          return of(null);
        }
      }),
      switchMap(emprendedorAgregado => {
        if (emprendedorAgregado) {
          this.emprendedor.id = emprendedorAgregado.id; // Asignar la ID del emprendedor agregado
          this.emprendimiento.id_emprendedor = this.emprendedor.id; // Asignar la ID del emprendedor al emprendimiento
          return this.servicio.agregar_emprendimiento(this.emprendimiento); // Agregar emprendimiento
        } else {
          return of(null);
        }
      }),
      switchMap(() => {
        if (this.gestor.rol === 'Cliente') {
          this.cliente.id_gestor = this.gestor.id; // Asignar la ID del gestor al cliente
          return this.servicio.agregar_cliente(this.cliente); // Agregar cliente
        } else {
          return of(null);
        }
      })
    ).subscribe(result => {
      console.log('Usuario registrado con éxito');
      console.log('Agregado al gestor');
      if (this.gestor.rol === 'Emprendedor') {
        console.log('Se agregó emprendedor');
        console.log('Se agregó emprendimiento');
      } else if (this.gestor.rol === 'Cliente') {
        console.log('Se agregó cliente');
      }
    });


      this.form_registro.reset();

  }
}

}


