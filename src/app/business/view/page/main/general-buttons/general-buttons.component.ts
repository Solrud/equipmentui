import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-general-buttons',
  templateUrl: './general-buttons.component.html',
  styleUrls: ['./general-buttons.component.css']
})
export class GeneralButtonsComponent {

  @Output()
  readonly openSidenav = new EventEmitter<void>();
  onClickOpenSideNav(){
    this.openSidenav.emit();
  }
}
