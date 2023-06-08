import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {HttpDataService} from '../../services/http-data.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  searchText = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]);
  isSearchValid(): boolean {
    return this.searchText.valid;
  }
  constructor(private router: Router, private httpDataService: HttpDataService){}
  home(){
    this.router.navigateByUrl('/home');
  }
  compras(){
    this.router.navigateByUrl('/compras');
  }

  busqueda() {
    const searchValue = this.searchText.value;
    this.httpDataService.searchProducts(searchValue);
    this.router.navigateByUrl('/busqueda');
  }


}
