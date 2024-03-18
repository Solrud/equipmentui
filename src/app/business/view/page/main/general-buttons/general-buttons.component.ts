import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {TableType} from "../../../../../app.constant";

@Component({
  selector: 'app-general-buttons',
  templateUrl: './general-buttons.component.html',
  styleUrls: ['./general-buttons.component.css']
})
export class GeneralButtonsComponent implements OnInit{
  sideNavArrow = 'right';
  selectedElementTable: any;
  selectedNavBar: TableType;

  tableType = TableType;

  @Output()
  readonly openSidenav = new EventEmitter<void>();

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this._subscribeSelectedElementTable();
    this._subscribeSelectedNavBar();
  }

  _subscribeSelectedElementTable(){
    this.eventService.selectedElementTable$.subscribe(result => {
      this.selectedElementTable = result;
      console.log(this.selectedElementTable)
    })
  }
  _subscribeSelectedNavBar(){
    this.eventService.selectedSpravTable$.subscribe( result => {
      this.selectedNavBar = result;
    })
  }

  onClickOpenSideNav(){
    this.sideNavArrow == 'left' ? this.sideNavArrow = 'right' : this.sideNavArrow = 'left';
    this.openSidenav.emit();
  }
}
