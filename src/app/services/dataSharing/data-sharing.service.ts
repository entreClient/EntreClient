import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MethodEnvio} from "../../models/methodEnvio";
import {MethodPayment} from "../../models/methodPayment";
@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private direccionSeleccionadaSubject = new BehaviorSubject<any>(null);
  direccionSeleccionada$ = this.direccionSeleccionadaSubject.asObservable();

  private metodoPagoSeleccionadoSubject = new BehaviorSubject<any>(null);
  metodoPagoSeleccionado$ = this.metodoPagoSeleccionadoSubject.asObservable();

  private checkedButtonEnvioDeliverySubject = new BehaviorSubject<boolean>(false);
  checkedButtonEnvioDelivery$ = this.checkedButtonEnvioDeliverySubject.asObservable();

  private checkedButtonPagoYapeSubject = new BehaviorSubject<boolean>(false);
  checkedButtonPagoYape$ = this.checkedButtonPagoYapeSubject.asObservable();

  private checkedButtonPagoTarjetaSubject = new BehaviorSubject<boolean>(false);
  checkedButtonPagoTarjeta$ = this.checkedButtonPagoTarjetaSubject.asObservable();

  setDireccionSeleccionada(direccionSeleccionada: any) {
    this.direccionSeleccionadaSubject.next(direccionSeleccionada);
  }

  setMetodoPagoSeleccionado(metodoPagoSeleccionado: any) {
    this.metodoPagoSeleccionadoSubject.next(metodoPagoSeleccionado);
  }

  setCheckedButtonEnvioDelivery(checkedButtonEnvioDelivery: boolean) {
    this.checkedButtonEnvioDeliverySubject.next(checkedButtonEnvioDelivery);
  }

  setCheckedButtonPagoYape(checkedButtonPagoYape: boolean) {
    this.checkedButtonPagoYapeSubject.next(checkedButtonPagoYape);
  }

  setCheckedButtonPagoTarjeta(checkedButtonPagoTarjeta: boolean) {
    this.checkedButtonPagoTarjetaSubject.next(checkedButtonPagoTarjeta);
  }

}
