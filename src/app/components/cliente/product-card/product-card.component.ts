import { Component } from '@angular/core'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  products = [
    {
      name: 'Polo Blanco',
      image: '/assets/imagnes/poloblanco.jpg',
      price: 10.00
    },
    {
      name: 'Billetera',
      image: '/assets/imagnes/billetera.jpg',
      price: 20.99
    },
    {
      name: 'Mochila',
      image: '/assets/imagnes/mochila.jpg',
      price: 86.00
    }
  ];
}
