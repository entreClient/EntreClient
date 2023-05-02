import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
    {path:'', redirectTo: 'registro', pathMatch: 'full'},
  { path: 'registro', component: RegistroComponent },
 
  { path: '**', redirectTo:'registro'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
