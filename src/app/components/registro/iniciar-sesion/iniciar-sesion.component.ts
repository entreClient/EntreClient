import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServidorService } from 'src/app/services/servidor.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {

  loginForm: FormGroup;


  constructor(private builder: FormBuilder, private servicio: ServidorService, private router: Router) {
    this.loginForm = this.builder.group({
      username: this.builder.control('', Validators.required),
      i_password: this.builder.control('', Validators.required),
    
    });
  }
    verificarLogin() { }
}
