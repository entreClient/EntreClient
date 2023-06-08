import { Component, OnInit} from '@angular/core';
import { HttpDataService } from "../../services/http-data.service";
import { Product } from "../../models/product";
import { Router } from '@angular/router';
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cantidadOrders: number = 0;

  generoFemenino: boolean = false;
  generoMasculino: boolean = false;

  recomendacion: number = 0;

  precioMenor50: boolean = false;
  precio50a100: boolean = false;
  precio100a150: boolean = false;
  precioMayor150: boolean = false;
  constructor(private httpDataService: HttpDataService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.httpDataService.filteredProducts.subscribe((filteredProducts: Product[]) => {
      this.filteredProducts = filteredProducts;
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
        this.router.navigateByUrl('/pagos');
      }
    });
  }

  verDetalleProducto(productId: any): void {
    this.router.navigateByUrl('/detalle-producto/' + productId);
  }

  filterByGender() {
    this.filteredProducts = this.products.filter(product => {
      if ((this.generoFemenino && product.gender === 'femenino') || (this.generoMasculino && product.gender === 'masculino')) {
        return true;
      } else if (!this.generoFemenino && !this.generoMasculino) {
        return true;
      }
      return false;
    });
  }

  filterByRecommendation() {
    this.filteredProducts = this.products.filter(product => {
      if (product.recomendation >= this.recomendacion) {
        return true;
      }
      return false;
    });
  }

  filterByPrice() {
    this.filteredProducts = this.products.filter(product => {
      if ((this.precioMenor50 && product.price < 50) ||
        (this.precio50a100 && product.price >= 50 && product.price <= 100) ||
        (this.precio100a150 && product.price > 100 && product.price <= 150) ||
        (this.precioMayor150 && product.price > 150)) {
        return true;
      } else if (!this.precioMenor50 && !this.precio50a100 && !this.precio100a150 && !this.precioMayor150) {
        return true;
      }
      return false;
    });
  }

  applyFilters() {
    this.filterByGender();
    this.filterByRecommendation();
    this.filterByPrice();
  }

  resetFilters() {
    this.generoFemenino = false;
    this.generoMasculino = false;
    this.recomendacion = 0;
    this.precioMenor50 = false;
    this.precio50a100 = false;
    this.precio100a150 = false;
    this.precioMayor150 = false;

    this.applyFilters();
  }

}
