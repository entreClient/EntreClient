import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from "../../models/product";
import { HttpDataService } from "../../services/http-data.service";
import { DialogConfirmationProductoComponent } from "../dialog-confirmation-producto/dialog-confirmation-producto.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit{
  constructor(private router: Router, private httpDataService: HttpDataService, private dialog: MatDialog){}
  ngOnInit() {
    this.httpDataService.getOrders().subscribe((response: any) => {
      this.compras = response;
      response.forEach((product: Product) => {
        this.cantidadTotal += product.quantity;
      });
    });

  }

  compras: Product[] = [];
  cantidadTotal: number = 0;

  increaseQuantity(itemIndex: number) {
    this.compras[itemIndex].quantity++;
    this.cantidadTotal++;
    this.httpDataService.updateOrder(this.compras[itemIndex]).subscribe((response: any) => {
      response.quantity++;
    });
  }

  decreaseQuantity(itemIndex: number) {
    if (this.compras[itemIndex].quantity > 1) {
      this.compras[itemIndex].quantity--;
      this.cantidadTotal--;
      this.httpDataService.updateOrder(this.compras[itemIndex]).subscribe((response: any) => {
        console.log(response);
      });
    } else {
      const item = this.compras[itemIndex];
      this.httpDataService.deleteOrder(item).subscribe((response: any) => {
        console.log(response);
        this.compras.splice(itemIndex, 1);
        this.cantidadTotal--;
      });
    }
  }
  pagos(itemIndex: number) {
    const selectedProduct = this.compras[itemIndex];
    this.httpDataService.createPago(selectedProduct).subscribe((response: any) => {
          console.log(response);
          this.compras.splice(itemIndex, 1);
    });
    this.router.navigateByUrl('/pagos');
  }





  limit() {
    return this.cantidadTotal>=10
  }

  eliminarOrder(itemIndex: number){
    const item = this.compras[itemIndex];
    this.httpDataService.deleteOrder(item).subscribe((response: any) => {
      console.log(response);
      this.compras.splice(itemIndex, 1);
      this.cantidadTotal-=item.quantity;
    });
  }

}
