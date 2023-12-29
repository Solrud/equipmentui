import {Component, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  showFiller = false;

  @ViewChild(MatDrawer)
  private readonly drawerComponent?: MatDrawer;

  toggleSidenavOpened(){
    this.drawerComponent?.toggle();
  }
}
