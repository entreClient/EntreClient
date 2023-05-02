import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './component/footer/footer.component';
import { PagoComponent } from './component/pago/pago.component';
import { ComprasComponent } from './component/compras/compras.component';

const routes: Routes = [
  {path: 'home', component: FooterComponent},
  {path: 'pagos', component: PagoComponent},
  {path: 'compras', component: ComprasComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
