import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MessageComponent } from '../message/message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit{
  ngOnInit(): void {  }
  constructor(private dialog: MatDialog, private snackbar: MatSnackBar) {}
  metodoEnvio="";
  metodoPago="";

  abrirDialogoCredito() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { tipoPago: 'credito' }
    });
  }

  abrirDialogoDebito() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { tipoPago: 'debito' }
    });
  }

  abrirDialogoDelivery(){
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {metodoEnvio: 'delivery'}
    });
  }

  abrirDialogoRecojoTienda(){
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {metodoEnvio: 'recojoTienda'}
    });
  }

  openSnackBar() {
    const snackBarRef = this.snackbar.openFromComponent(MessageComponent, {
      duration: 3000,
    });
  }
}
