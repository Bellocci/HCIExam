import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarData } from 'src/app/service/snack-bar.service';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent implements OnInit {

  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) private data: SnackBarData) {
    console.log("[" + data.type + "] " + data.message);
  }

  ngOnInit(): void { }

  getIcon() : string {    
    return this.data.type.icon;
  }

  getMessage() : string {
    return this.data.message;
  }
}
