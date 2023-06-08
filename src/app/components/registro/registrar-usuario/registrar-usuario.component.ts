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


    } else if (this.gestor.rol === "Cliente") {
      this.cliente.nombre = this.form_registro.value.nombre;
      this.cliente.apellido = this.form_registro.value.apellido;
      this.cliente.celular = this.form_registro.value.celular;
      this.cliente.email = this.form_registro.value.email;
      this.cliente.id_gestor = this.gestor.id;
    }
      

  }

  registrarUsuario() {

  
}

}

