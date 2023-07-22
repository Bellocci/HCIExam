import { Component, OnInit } from '@angular/core';
import { InternalDataService } from '../../service/internal-data.service';
import { Player } from 'src/decorator/player.model';
import { ObserverStepBuilder } from 'src/utility/observer-step-builder';
import { SportEnum } from 'src/enum/SportEnum.model';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css']
})
export class PlayerPageComponent implements OnInit {

  private playerSelected:Player | null = null;

  constructor(private internalDataService:InternalDataService) {}

  ngOnInit(): void {
    this.internalDataService.setLoadingData(false);
    this.addObserverToPlayer();
  }

  private addObserverToPlayer() : void {
    this.internalDataService.addObserverToPlayerSelected(new ObserverStepBuilder<Player | null>()
      .next(player => this.playerSelected = player)
      .build());
  }

  /* Getter */

  getName() : string | undefined {
    return this.playerSelected?.getName();
  }

  getRole() : string | undefined {
    return this.playerSelected?.getRole().getDescription();
  }
 
  getAge() : number | undefined {
    return this.playerSelected?.getAge();
  }

  getTeam() : string | undefined {
    return this.playerSelected?.getTeam().getName();
  }

  getDescription() : string | undefined {
    return this.playerSelected?.getDescription();
  }
}
