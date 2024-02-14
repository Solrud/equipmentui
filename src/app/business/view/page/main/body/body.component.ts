import {Component, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {GruppaSearchDTO} from "../../../../data/model/search/impl/GruppaSearchDTO";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  showFiller = false;

  @ViewChild(MatDrawer)
  private readonly drawerComponent?: MatDrawer;

  constructor(private gruppaService: GruppaService) {
  }

  toggleSidenavOpened(){
    this.drawerComponent?.toggle();
  }

  test(){
    this.gruppaService.searchList().subscribe(res => {
      console.log(res)
    })
  }
}
