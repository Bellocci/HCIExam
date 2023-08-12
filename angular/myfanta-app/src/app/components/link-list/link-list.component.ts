import { Component, Input, OnInit } from '@angular/core';
import { RouterService } from 'src/app/service/router.service';
import { LinkEnum } from 'src/enum/LinkEnum.model';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {
  
  @Input() linkList:LinkEnum[] = [];

  constructor(private routerService:RouterService) { }

  ngOnInit(): void { }

  getLinks() : LinkEnum[] {
    return this.linkList;
  }

  isLinkActivated(link:LinkEnum) : boolean {
    return this.routerService.isLinkActivated(link);
  }

  redirectToLink(link:LinkEnum) : void {
    this.routerService.goToLink(link);
  }
}
