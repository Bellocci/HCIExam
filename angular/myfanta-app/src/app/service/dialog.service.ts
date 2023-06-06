import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogHelperImpl } from '../Dialog/dialogHelperImpl';
import { DialogHelper } from '../Dialog/dialogHelper.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogHelper:DialogHelperImpl;

  constructor(private matDialog:MatDialog) {
    this.dialogHelper = new DialogHelperImpl(this.matDialog);
  }

  getDialogHelper() : DialogHelper {
    return this.dialogHelper;
  }

  closeAllDialog() : void {
    this.matDialog.closeAll();
  }
}
