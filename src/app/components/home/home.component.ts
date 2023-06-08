import { Component, OnInit} from '@angular/core';
import { Product } from "../../models/product";
import { HttpDataService } from "../../services/http-data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(){}
  ngOnInit(): void {

  }


}
