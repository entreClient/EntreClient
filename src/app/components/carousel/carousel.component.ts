import {Component, OnInit} from '@angular/core';
import { HttpDataService } from "../../services/http-data.service";
import { Router } from '@angular/router';
import { Product } from "../../models/product";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import {of} from "rxjs";


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  products: Product[] = [];
  showNavigationArrows = true;
  showNavigationIndicators = false;
  cantidadOrders: number = 0;
  constructor(private router: Router, private httpDataService: HttpDataService, config: NgbCarouselConfig, private dialog: MatDialog) {
    config.showNavigationArrows = true;
  }

  ngOnInit() {
    this.httpDataService.getProducts().subscribe((response: any) => {
      this.products = response;
      response.forEach((product: Product) => {
        this.cantidadOrders += product.quantity;
      });
    });
  }

  compras() {
    this.router.navigateByUrl('/compras');
  }

  addToCart(product: Product) {
    this.httpDataService.getOrders().subscribe((cart: any) => {
      const index = cart.findIndex(p => p.name === product.name);
      if (index >= 0) {
        if (this.cantidadOrders < 10) {
          cart[index].quantity++;
          this.cantidadOrders++;
          this.httpDataService.updateOrder(cart[index]).subscribe((response: any) => {
            console.log(response);
          }); // Incrementa la cantidad si el producto ya existe en el carrito y no ha alcanzado el límite máximo
        } else {
          console.log('Se ha alcanzado la cantidad máxima permitida para este producto.');
        }
      } else {
        if (cart.length < 10 && this.cantidadOrders < 10) {
          product.quantity = 1;
          this.cantidadOrders++;// Establece la cantidad en 1 para un nuevo producto en el carrito
          this.httpDataService.createOrder(product).subscribe((response: any) => {
            console.log(response);
          }); // Agrega el nuevo producto al carrito si no se ha alcanzado el límite máximo
        } else {
          console.log('Se ha alcanzado la cantidad máxima de productos en el carrito.');
        }
      }

      this.showConfirmationDialog(product);
    });
  }


  showConfirmationDialog(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'navigate') {
        // Redirecciona a seguir navegando
      } else if (result === 'checkout') {
        this.compras();
      }
    });
  }

  verDetalleProducto(productId: any): void {
    this.router.navigateByUrl('/detalle-producto/' + productId);
  }

}


