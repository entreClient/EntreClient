import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError, BehaviorSubject} from 'rxjs';
import { Product } from '../models/product';
import { Emprendimiento } from "../models/emprendimiento";
import { MethodPayment } from "../models/methodPayment";
import {MethodEnvio} from "../models/methodEnvio";
import {Compra} from "../models/compra";

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  base_Url_products = "http://localhost:3000/products";
  base_Url_methodPayment = "http://localhost:3000/methodPayment";
  base_Url_users = "http://localhost:3000/users";
  base_Url_orders = "http://localhost:3000/orders";
  base_Url_compras = "http://localhost:3000/compras";
  base_Url_emprendimientos = "http://localhost:3000/emprendimientos";
  base_Url_productPago = "http://localhost:3000/pagos";
  base_Url_delivery = "http://localhost:3000/delivery";
  searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filteredProducts: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An error ocurred ${error.status}, body was: ${error.error}`);
    }else{
      console.log(`Backend returned cod ${error.status}, body was: ${error.error}`)
    }
    return throwError(
      'Something happend with request, try again.'
    );
  }

  getProducts(): Observable<Product>{
    return this.http
      .get<Product>(this.base_Url_products)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteComprasProducts(): Observable<Product>{
    return this.http
      .delete<Product>(this.base_Url_compras)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteOrders(): Observable<Product>{
    return this.http
      .delete<Product>(this.base_Url_orders)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteCompras(): Observable<Compra>{
    return this.http
      .delete<Compra>(`${this.base_Url_compras}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getEmprendimientos(): Observable<Emprendimiento>{
    return this.http
      .get<Emprendimiento>(this.base_Url_emprendimientos)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCompras(): Observable<Compra>{
    return this.http
      .get<Compra>(this.base_Url_compras)
      .pipe(retry(2), catchError(this.handleError));
  }

  getPagos(): Observable<Product>{
    return this.http
      .get<Product>(this.base_Url_productPago)
      .pipe(retry(2), catchError(this.handleError));
  }

  getDeliveries(): Observable<MethodEnvio>{
    return this.http
      .get<MethodEnvio>(this.base_Url_delivery)
      .pipe(retry(2), catchError(this.handleError));
  }

  getProduct(id: string): Observable<Product>{
    return this.http
      .get<Product>(this.base_Url_products + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  createOrder(product: any): Observable<Product>{
    return this.http
      .post<Product>(this.base_Url_orders, JSON.stringify(product), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  createCompra(compra: any): Observable<Compra>{
    return this.http
      .post<Compra>(this.base_Url_compras, JSON.stringify(compra), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  createPago(product: any): Observable<Product>{
    return this.http
      .post<Product>(this.base_Url_productPago, JSON.stringify(product), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getOrders(): Observable<Product>{
    return this.http
      .get<Product>(this.base_Url_orders)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateOrder(product: any): Observable<Product> {
    return this.http
      .put<Product>(this.base_Url_orders + '/' + product.id, JSON.stringify(product), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getOrder(id: string): Observable<Product>{
    return this.http
      .get<Product>(this.base_Url_orders + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteOrder(product: any): Observable<Product>{
    return this.http
      .delete<Product>(`${this.base_Url_orders}/${product.id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }



  getMethodPayments(): Observable<MethodPayment>{
    return this.http
      .get<MethodPayment>(this.base_Url_methodPayment)
      .pipe(retry(2), catchError(this.handleError));
  }

  getMethodPayment(id: string): Observable<MethodPayment>{
    return this.http
      .get<MethodPayment>(this.base_Url_methodPayment + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCompra(id: string): Observable<Compra>{
    return this.http
      .get<Compra>(this.base_Url_compras + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  getEmprendimiento(id: string): Observable<Emprendimiento>{
    return this.http
      .get<Emprendimiento>(this.base_Url_emprendimientos + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateMethodPayment(id: string, item: any, tipoPago: string): Observable<MethodPayment> {
    let url = this.base_Url_methodPayment + '/' + id;

    if (tipoPago === 'yape') {
      // Realiza la lógica para actualizar el pago de Yape
      url += '/yape'; // Agrega un sufijo en la URL para identificar el tipo de pago
    } else if (tipoPago === 'tarjeta') {
      // Realiza la lógica para actualizar el pago con tarjeta
      url += '/tarjeta'; // Agrega un sufijo en la URL para identificar el tipo de pago
    }

    return this.http
      .put<MethodPayment>(url, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateProductCompra(id: any, item: any): Observable<Product> {
    return this.http
      .put<Product>(this.base_Url_productPago + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  createMethodPayment(item: any, tipoPago: string): Observable<MethodPayment> {
    let url = this.base_Url_methodPayment;
    return this.http
      .post<MethodPayment>(url, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteMethodPayment(id: string): Observable<MethodPayment>{
    return this.http
      .delete<MethodPayment>(`${this.base_Url_methodPayment}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deletePagoProducto(id: string): Observable<Product>{
    return this.http
      .delete<Product>(`${this.base_Url_productPago}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteProduct(id: string): Observable<Product>{
    return this.http
      .delete<Product>(`${this.base_Url_productPago}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  filterProducts(products: Product[], searchText: string) {
    const filteredProducts = products.filter((product: Product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    this.filteredProducts.next(filteredProducts);
  }

  searchProducts(searchText: string): void {
    this.searchText.next(searchText);
    this.getProducts().subscribe((products: any) => {
      this.filterProducts(products, searchText);
    });
  }

  createDelivery(item: any): Observable<MethodEnvio> {
    return this.http
      .post<MethodEnvio>(this.base_Url_delivery, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
