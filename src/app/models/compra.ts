import {Product} from "./product";
import {Emprendimiento} from "./emprendimiento";
import {MethodPayment} from "./methodPayment";
import {MethodEnvio} from "./methodEnvio";

export interface Compra {
  id: any;
  date: any;
  montototal: any;
  metodoEnvio: MethodEnvio;
  metodoPago: MethodPayment;
  productos: Product[];
}
