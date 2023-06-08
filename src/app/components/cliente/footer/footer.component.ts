import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  products = [
    {
      name: 'Producto 1',
      description: 'Descripción del producto 1',
      image: '/assets/imagnes/CamisetaMa.jpg',
      price: 9.99
    },
    {
      name: 'Producto 2',
      description: 'Descripción del producto 2',
      image: '/assets/imagnes/cartera.jpg',
      price: 19.99
    },
    {
      name: 'Producto 3',
      description: 'Descripción del producto 3',
      image: '/assets/imagnes/zapatilla.jpg'
    }
  ]
}
