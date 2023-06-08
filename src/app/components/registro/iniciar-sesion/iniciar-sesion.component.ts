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
  verificarLogin() { 
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.i_password;
    
    if (this.loginForm.valid) {
      this.servicio.getGestor(username, password).subscribe(
        rol => {
          if (rol === 'Emprendedor') {
            this.router.navigate(['pag-emprendedor']);
          } else if (rol === 'Cliente') {
            this.router.navigate(['pag-cliente']);
          } else {
            console.log('Rol no especificado');
          }
        },
        error => {
          console.log('Credenciales inválidas');
        }
      );
    } else {
      console.log('El formulario no es válido');
    }
  }
}
