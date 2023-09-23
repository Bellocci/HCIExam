import { Component, OnInit } from '@angular/core';
import { InternalDataService } from '../../service/internal-data.service';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { PlayerEntity } from 'src/model/playerEntity.model';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css']
})
export class PlayerPageComponent implements OnInit {

  private _playerSelected: PlayerEntity | null = null;    

  constructor(private internalDataService:InternalDataService) {}

  ngOnInit(): void {
    this.internalDataService.setLoadingData(false);
    this.addObserverToPlayer();
  }

  private addObserverToPlayer() : void {
    this.internalDataService.addObserverToPlayerSelected(new ObserverStepBuilder<PlayerEntity | null>()
      .next(player => this.playerSelected = player)
      .build());
  }

  /* Getter */

  public get playerSelected(): PlayerEntity | null {
    return this._playerSelected;
  }

  private set playerSelected(value: PlayerEntity | null) {
    this._playerSelected = value;
  }
}
