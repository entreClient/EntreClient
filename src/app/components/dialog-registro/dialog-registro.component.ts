import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-registro',
  templateUrl: './dialog-registro.component.html',
  styleUrls: ['./dialog-registro.component.css']
})
export class DialogRegistroComponent {
 trueD = '';

  falseD = '';

 constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }
  
  actualizarTrueFalse(v: string, f: string) {
    this.trueD = v;
    this.falseD = f;
    
  }
}
