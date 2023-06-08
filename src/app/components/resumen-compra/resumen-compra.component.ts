import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpDataService } from "../../services/http-data.service";
import { Compra } from "../../models/compra";


@Component({
  selector: 'app-resumen-compra',
  templateUrl: './resumen-compra.component.html',
  styleUrls: ['./resumen-compra.component.css']
})
export class ResumenCompraComponent implements OnInit{

  compra: Compra;

  constructor(private route: ActivatedRoute, private router: Router, private httpDataService: HttpDataService) {

  }

  ngOnInit() {
    this.getCompra();
  }

  getCompra(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Suponiendo que recibes el ID del producto como parámetro en la URL
    if (id) {
      this.httpDataService.getCompra(id)
        .subscribe((compra: Compra) => {
          this.compra = compra;
        });
    }
  }

  volverAlInicio(){
    this.router.navigateByUrl('/home');
  }

  irAMisCompras(){
    this.router.navigateByUrl('/mis-compras');
  }

}
