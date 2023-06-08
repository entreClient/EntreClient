import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PagoComponent } from './components/pago/pago.component';
import { ComprasComponent } from './components/compras/compras.component';
import {MisComprasComponent} from "./components/mis-compras/mis-compras.component";
import {DetalleProductoComponent} from "./components/detalle-producto/detalle-producto.component";
import {BusquedaComponent} from "./components/busqueda/busqueda.component";
import {ResumenCompraComponent} from "./components/resumen-compra/resumen-compra.component";
import {PerfilComponent} from "./components/perfil/perfil.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'pagos', component: PagoComponent},
  {path: 'compras', component: ComprasComponent},
  {path: 'detalle-producto/:id', component: DetalleProductoComponent},
  {path: 'busqueda', component: BusquedaComponent},
  {path: 'mis-compras', component: MisComprasComponent},
  {path: 'mis-compras/:id', component: ResumenCompraComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
