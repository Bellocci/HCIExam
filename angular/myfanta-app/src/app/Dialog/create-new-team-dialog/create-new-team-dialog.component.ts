import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SportEnum } from 'src/enum/SportEnum.model';

@Component({
  selector: 'app-create-new-team-dialog',
  templateUrl: './create-new-team-dialog.component.html',
  styleUrls: ['./create-new-team-dialog.component.css'],
})
export class CreateNewTeamDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  selectedSport:SportEnum | string = "";

  ngOnInit(): void {
  }

  /* GETTER */

  getSport() : SportEnum[] {
    return SportEnum.getAllSport();
  }

  /* METODI LISTENER */

  closeDialog() : void {
    this.clearData();
    this.dialog.closeAll();
  }

  /* METODI PRIVATI */

  private clearData() : void {
    
  }
}
