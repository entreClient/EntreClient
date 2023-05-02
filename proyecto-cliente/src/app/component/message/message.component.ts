import { Component, Inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  snackBarRef = Inject(MatSnackBarRef);
}
