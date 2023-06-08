import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//

import { IniciarSesionComponent } from './components/registro/iniciar-sesion/iniciar-sesion.component';
import { RegistrarUsuarioComponent } from './components/registro/registrar-usuario/registrar-usuario.component';
import { CambiarContraseniaComponent } from './components/registro/cambiar-contrasenia/cambiar-contrasenia.component';

const routes: Routes = [
    {path:'', redirectTo: 'iniciar_Sesion', pathMatch: 'full'},
     { path: 'iniciar_Sesion', component: IniciarSesionComponent },
  { path: 'registro', component: RegistrarUsuarioComponent },
     { path: 'cambiar-contraseña', component: CambiarContraseniaComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
