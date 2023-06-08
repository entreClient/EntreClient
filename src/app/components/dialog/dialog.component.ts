import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Emprendimiento } from "../../models/emprendimiento";
import { HttpDataService } from "../../services/http-data.service";
import { Product } from "../../models/product";
import { MethodPayment } from "../../models/methodPayment";
import { MethodEnvio } from "../../models/methodEnvio";
import {Compra} from "../../models/compra";
import {DataSharingService} from "../../services/dataSharing/data-sharing.service";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: { tipoPago: string, metodoEnvio: string, activedRadioButtonPago: boolean, activedRadioButtonEnvio: boolean, deliveryData: any, card: any, yape: any }, private httpDataService: HttpDataService, private dataSharingService: DataSharingService, public dialogRef: MatDialogRef<DialogComponent>) {}
  numeroTarjeta = new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]);
  currentDate = new Date();
  currentYear= this.currentDate.getFullYear() % 100;

  minYear = (this.currentYear >= 23) ? this.currentYear : 23;

  fechaExpiracion = new FormControl('', [
    Validators.required,
    Validators.pattern(`(0[1-9]|1[0-2])\\/(0[1-9]|1[0-2]|${this.minYear}-99)`)
  ]);
  cvv = new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]);
  nombreTarjeta = new FormControl('', [Validators.required, Validators.pattern('[A-Za-z\s]+')]);

  numeroCelular = new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]);
  nombreYape= new FormControl('', [Validators.required, Validators.pattern('[A-Za-z\s]+')]);
  numeroDocumento = new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]);

  direccion = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9.\s]+$')]);
  celular = new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]);


  productos: Product[];
  compras: Compra[];
  direccionSeleccionada: MethodEnvio;
  metodoPagoSeleccionado: MethodPayment;
  direcciones: MethodEnvio[];
  methodPayments: MethodPayment[];
  radioButtonSeleccionado = false;

  ngOnInit(): void {

    this.httpDataService.getPagos().subscribe((response: any) => {
      this.productos = response;
    });


    this.httpDataService.getDeliveries().subscribe((response: any) => {
      this.direcciones = response;
    });

    this.httpDataService.getMethodPayments().subscribe((response: any) => {
      this.methodPayments = response;
    });

    this.httpDataService.getCompras().subscribe((response: any) => {
      this.compras = response;
    });

  }

  camposValidosTarjeta(): boolean {
    return this.numeroTarjeta.valid
      && this.fechaExpiracion.valid
      && this.cvv.valid
      && this.nombreTarjeta.valid;
  }

  camposValidosYape(): boolean {
    return this.numeroCelular.valid
      && this.nombreYape.valid
      && this.numeroDocumento.valid;
  }

  camposValidosDelivery(): boolean {
    return this.direccion.valid
      && this.celular.valid;
  }

  cerrarDialogo(){
    this.dataSharingService.setCheckedButtonPagoTarjeta(false);
    this.dataSharingService.setCheckedButtonPagoYape(false);
    this.dataSharingService.setCheckedButtonEnvioDelivery(false);
    this.dialogRef.close();
  }

  agregarPago() {
    if (this.data.tipoPago === 'yape') {
      const yapeData = {
        numero_celular: this.numeroCelular.value,
        nombre_titular: this.nombreYape.value,
        numero_documento: this.numeroDocumento.value,
        type: 'yape'
      };

      const metodoPagoExistente = this.methodPayments.find(pago => pago.numero_celular === yapeData.numero_celular && pago.nombre_titular === yapeData.nombre_titular && pago.numero_documento === yapeData.numero_documento);
      if (metodoPagoExistente) {
        console.log('El método de pago ya existe');
        return;
      }

      this.httpDataService.createMethodPayment(yapeData, 'yape').subscribe(
        (response) => {

        },
        (error) => {
          console.error('Error al agregar el pago de Yape:', error);
        }
      );

      this.dataSharingService.setMetodoPagoSeleccionado(yapeData);
      this.dataSharingService.setCheckedButtonPagoYape(true);

    } else if (this.data.tipoPago === 'tarjeta') {
      const cardData = {
        number_card: this.numeroTarjeta.value,
        name_card: this.nombreTarjeta.value,
        expiration_date_card: this.fechaExpiracion.value,
        cvv_card: this.cvv.value,
        type: 'tarjeta'
      };

      const metodoPagoExistente = this.methodPayments.find(pago => pago.number_card === cardData.number_card && pago.nombre_titular === cardData.number_card && pago.expiration_date_card === cardData.expiration_date_card && pago.cvv_card === cardData.cvv_card);
      if (metodoPagoExistente) {
        console.log('El método de pago ya existe');
        return;
      }

      this.httpDataService.createMethodPayment(cardData, 'tarjeta').subscribe(
        (response) => {
        },
        (error) => {
          console.error('Error al agregar el pago con tarjeta:', error);
        }
      );

      this.dataSharingService.setMetodoPagoSeleccionado(cardData);
      this.dataSharingService.setCheckedButtonPagoTarjeta(true);
    }

    this.dialogRef.close();
  }


  agregarEnvio() {
    const direccionIngresada = this.direccion.value;
    const celularIngresado = this.celular.value;

    const direccionExistente = this.direcciones.find(direccion => direccion.direccion === direccionIngresada && direccion.celular === celularIngresado);
    if (direccionExistente) {
      console.log('La dirección ya existe');
      return;
    }

    const envioData = {
      direccion: direccionIngresada,
      celular: celularIngresado,
      type: 'delivery'
    };

    this.httpDataService.createDelivery(envioData).subscribe(
      (response) => {
      },
      (error) => {
        console.error('Error al agregar el envío:', error);
      }
    );
    this.dataSharingService.setDireccionSeleccionada(envioData);
    this.dataSharingService.setCheckedButtonEnvioDelivery(true);
    this.dialogRef.close();
  }

  obtenerDireccionSeleccionada() {
    if (this.direccionSeleccionada) {
      this.dataSharingService.setDireccionSeleccionada(this.direccionSeleccionada);
      this.dataSharingService.setCheckedButtonEnvioDelivery(true);
      this.dialogRef.close();
    } else {
      console.log('No se ha seleccionado ninguna dirección');
      this.dataSharingService.setCheckedButtonEnvioDelivery(false);
      this.dialogRef.close();
    }

  }

  obtenerMetodoPagoSeleccionado() {
    if (this.metodoPagoSeleccionado) {
      this.dataSharingService.setMetodoPagoSeleccionado(this.metodoPagoSeleccionado);
      if(this.metodoPagoSeleccionado.type === 'tarjeta')
        this.dataSharingService.setCheckedButtonPagoTarjeta(true);
      else
        this.dataSharingService.setCheckedButtonPagoYape(true);
      this.dialogRef.close();
    } else {
      console.log('No se ha seleccionado ningún método de pago');
      if(this.metodoPagoSeleccionado.type === 'tarjeta')
        this.dataSharingService.setCheckedButtonPagoTarjeta(false);
      else
        this.dataSharingService.setCheckedButtonPagoYape(false);
      this.dialogRef.close();
    }

  }

}
