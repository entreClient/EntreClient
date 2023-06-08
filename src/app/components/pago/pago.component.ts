import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { DialogComponent } from '../dialog/dialog.component';
import { MessageComponent } from '../message/message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from "../../models/product";
import { HttpDataService } from "../../services/http-data.service";
import { Emprendimiento } from "../../models/emprendimiento";
import { DataSharingService } from "../../services/dataSharing/data-sharing.service";
import {MethodPayment} from "../../models/methodPayment";
import {MethodEnvio} from "../../models/methodEnvio";
import {Compra} from "../../models/compra";
import {Router} from "@angular/router";
import { v4 as uuidv4 } from 'uuid';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit{
  ngOnInit(): void {
    this.httpDataService.getPagos().subscribe((response: any) => {
      this.pagos = response;
      this.getMontoTotal();
    });

    this.httpDataService.getOrders().subscribe((response: any) => {
      this.orders = response;
    });

  }
  constructor(private dialog: MatDialog, private snackbar: MatSnackBar, private httpDataService: HttpDataService, private dataSharingService: DataSharingService, private router: Router) {
    this.dataSharingService.direccionSeleccionada$.subscribe(direccion => {
      this.direccionSeleccionada = direccion;
    });

    this.dataSharingService.checkedButtonPagoTarjeta$.subscribe(checked => {
      this.checkedPagoTarjeta = checked;
    });

    this.dataSharingService.checkedButtonPagoYape$.subscribe(checked => {
      this.checkedPagoYape = checked;
    });

    this.dataSharingService.checkedButtonEnvioDelivery$.subscribe(checked => {
      this.checkedEnvioDelivery = checked;
    });

    this.dataSharingService.metodoPagoSeleccionado$.subscribe(metodoPago => {
      this.metodoPagoSeleccionado = metodoPago;
    });

  }
  name: string="";
  metodoEnvio="";
  metodoPago="";
  pagos: Product[] = [];
  orders: Product[] = [];
  emprendimiento: Emprendimiento | undefined;
  direccionSeleccionada: MethodEnvio;
  metodoPagoSeleccionado: MethodPayment;
  compra: Compra;
  montoTotal: number = 0;
  checkedEnvioDelivery: boolean = false;
  checkedPagoYape: boolean = false;
  checkedPagoTarjeta: boolean = false;
  id: string = uuidv4();
  abrirDialogoTarjeta() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { tipoPago: 'tarjeta' }
    });
  }

  abrirDialogoYape() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { tipoPago: 'yape' }
    });
  }

  abrirDialogoDelivery(){
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {metodoEnvio: 'delivery'}
    });
  }

  openSnackBar() {
    this.createCompra();
    const snackBarRef = this.snackbar.openFromComponent(MessageComponent, {
      duration: 3000,
    });
    this.verResumen(this.compra.id);
  }



  getMontoTotal(): number {
    this.pagos.forEach((p: Product) => {
      this.montoTotal += (p.price * p.quantity);
    });
    return this.montoTotal;
  }

  createCompra() {
    const currentDate: Date = new Date();
    const day: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1;
    const year: number = currentDate.getFullYear();

    const formattedDate: string = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString()}`;

    this.compra = {
      id: this.id,
      date: formattedDate,
      montototal: this.montoTotal,
      metodoEnvio: this.direccionSeleccionada,
      metodoPago: this.metodoPagoSeleccionado,
      productos: this.pagos,
    };
    this.httpDataService.createCompra(this.compra).subscribe((response: any) => {
      console.log(response);
    });
  }

  verResumen(compraId: any): void {
    this.router.navigateByUrl('/mis-compras/' + compraId);
  }

}
