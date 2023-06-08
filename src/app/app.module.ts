import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { ComprasComponent } from './components/compras/compras.component';
import { PagoComponent } from './components/pago/pago.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageComponent } from './components/message/message.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RouterModule } from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { ResumenCompraComponent } from './components/resumen-compra/resumen-compra.component';
import { MisComprasComponent } from './components/mis-compras/mis-compras.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MatSelectModule } from '@angular/material/select';
import { DialogConfirmationProductoComponent } from './components/dialog-confirmation-producto/dialog-confirmation-producto.component';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    BusquedaComponent,
    ComprasComponent,
    PagoComponent,
    DialogComponent,
    MessageComponent,
    CarouselComponent,
    ConfirmationDialogComponent,
    DetalleProductoComponent,
    ResumenCompraComponent,
    MisComprasComponent,
    PerfilComponent,
    DialogConfirmationProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatRadioModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule,
    NgOptimizedImage,
    NgbModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
