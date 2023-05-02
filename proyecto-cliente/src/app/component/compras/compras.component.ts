import { Component } from '@angular/core';
import { Router } from '@angular/router';
interface ListItem{
  imageUrl: string;
  title: string;
  description: string;
  quantity: number;
}
@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  constructor(private router: Router){}

  lista: ListItem[] = [
    {
      imageUrl: 'https://home.ripley.com.pe/Attachment/WOP_5/2005302760186/2005302760186_2.jpg',
      title: 'Card 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae turpis mi. Vestibulum feugiat.',
      quantity: 1
    },
    {
      imageUrl: 'https://falabella.scene7.com/is/image/FalabellaPE/881530344_1?wid=800&hei=800&qlt=70',
      title: 'Card 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae turpis mi. Vestibulum feugiat.',
      quantity: 1
    },
    {
      imageUrl: 'https://equusio.vtexassets.com/arquivos/ids/211564/02SPRL0137Q7-M5-1.jpg?v=1768935314',
      title: 'Card 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae turpis mi. Vestibulum feugiat.',
      quantity: 1
    },
    {
      imageUrl: 'https://coliseum.vteximg.com.br/arquivos/ids/509275-1000-1000/ZAPATILLA-UNISEX-CONVERSE-CT-AS-164027C-0_1.jpg?v=638042062481800000 ',
      title: 'Card 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae turpis mi. Vestibulum feugiat.',
      quantity: 1
    },
    {
      imageUrl: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/b176022632f94708b1c6a80b00e7fee4_9366/Zapatilla_AX2R_Negro_BB1935_01_standard.jpg',
      title: 'Card 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae turpis mi. Vestibulum feugiat.',
      quantity: 1
    },
    {
      imageUrl: 'https://calvinperu.vteximg.com.br/arquivos/ids/221625-470-620/K10K110858_YAF_1.jpg?v=638103544996730000',
      title: 'Card 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae turpis mi. Vestibulum feugiat.',
      quantity: 1
    }
  ];

  increaseQuantity(itemIndex: number) {
    this.lista[itemIndex].quantity++;
  }

  decreaseQuantity(itemIndex: number) {
    this.lista[itemIndex].quantity--;
  }

  pagos(){
    this.router.navigateByUrl('/pagos');
  }
}
