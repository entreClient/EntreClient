import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../models/product';
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
@Component({
  selector: 'app-dialog-confirmation-producto',
  templateUrl: './dialog-confirmation-producto.component.html',
  styleUrls: ['./dialog-confirmation-producto.component.css']
})
export class DialogConfirmationProductoComponent implements OnInit {

  ngOnInit() {

  }

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product) {}

  onNoClick() {
    this.dialogRef.close('keepingProducts');
  }

  onYesClick(){
    this.dialogRef.close('deleteList');
  }

}
