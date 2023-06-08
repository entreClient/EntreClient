import {Component, OnInit} from '@angular/core';
import {HttpDataService} from "../../services/http-data.service";
import {Compra} from "../../models/compra";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrls: ['./mis-compras.component.css']
})
export class MisComprasComponent implements OnInit{
  compras: Compra[] = [];

  constructor(private httpDataService: HttpDataService, private router: Router) { }

  ngOnInit() {
    this.httpDataService.getCompras().subscribe((response: any) => {
      this.compras = response;
    });
  }

  verDetalle(compraId: any): void {
    this.router.navigateByUrl('/mis-compras/' + compraId);
  }

  volverAlInicio(){
    this.router.navigateByUrl('/home');
  }
}
