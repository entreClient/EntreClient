import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//
import { RegistroComponent } from './components/registro/registro.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';

const routes: Routes = [
    {path:'', redirectTo: 'iniciar_Sesion', pathMatch: 'full'},
  { path: 'registro', component: RegistroComponent },
 { path: 'iniciar_Sesion', component: IniciarSesionComponent },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
