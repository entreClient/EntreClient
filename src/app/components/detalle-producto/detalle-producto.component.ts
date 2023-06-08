import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpDataService } from "../../services/http-data.service";
import { Product } from "../../models/product";
import { Emprendimiento } from "../../models/emprendimiento";

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit{
  product: Product;
  comentarios: string;
  valoracion: number;
  estrellas: number[];
  emprendimientos: Emprendimiento[];
  constructor(private router: ActivatedRoute, private httpDataService: HttpDataService) {

  }

  ngOnInit() {
    this.getProduct();
    this.estrellas = [1, 2, 3, 4, 5];
    this.httpDataService.getEmprendimientos().subscribe((emprendimientos: any) => {
      this.emprendimientos = emprendimientos;
    });
  }

  getProduct(): void {
    const id = this.router.snapshot.paramMap.get('id'); // Suponiendo que recibes el ID del producto como parámetro en la URL
    if (id) {
      this.httpDataService.getProduct(id)
        .subscribe((product: Product) => {
          this.product = product;
          this.product.quantity = 1;
        });
    }
  }

  agregarAlCarrito(): void {
    this.httpDataService.createOrder(this.product)
      .subscribe((product: Product) => {
      });
  }

  enviarComentario(): void {
    const comentario = {
      comentario: this.comentarios,
      valoracion: this.valoracion
    };

  }

  seleccionarValoracion(valor: number): void {
    this.valoracion = valor;
  }

  getEmprendimientoName(emprendimientoId: any): string {
    const emprendimiento = this.emprendimientos.find(emprendimiento => emprendimiento.id === emprendimientoId);
    return emprendimiento ? emprendimiento.name : '';
  }

}
