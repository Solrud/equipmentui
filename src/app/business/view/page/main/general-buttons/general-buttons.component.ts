import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {DialogMode, DialogResult, TableType} from "../../../../../app.constant";
import {OpenDialogService} from "../../../../data/service/OptionalService/open-dialog.service";

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

  @Output()
  readonly researchPage = new EventEmitter<void>();

  constructor(private eventService: EventService,
              private openDialogService: OpenDialogService) {
  }

  ngOnInit(): void {
    this._subscribeSelectedElementTable();
    this._subscribeSelectedNavBar();
  }

  _subscribeSelectedElementTable(){
    this.eventService.selectedElementTable$.subscribe(result => {
      this.selectedElementTable = result;
      // console.log(this.selectedElementTable)
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

  onClickAddNewElement(){
    this.openDialogService.openElementDialog(this.selectedElementTable, this.selectedNavBar, DialogMode.CREATE).closed.subscribe( result => {
      if (result == DialogResult.ACCEPT)
        this.researchPage.emit();
    });
  }

  onClickEditElement(){
    this.openDialogService.openElementDialog(this.selectedElementTable, this.selectedNavBar, DialogMode.EDIT).closed.subscribe( result => {
      if (result == DialogResult.ACCEPT)
        this.researchPage.emit();
    });
  }

  onClickChangeActivityElement(){
    this.openDialogService.openElementConfirmDialog(this.selectedElementTable, this.selectedNavBar, DialogMode.CHANGE_ACTIVITY).closed.subscribe( result => {
      if (result == DialogResult.ACCEPT)
        this.researchPage.emit();
    })
  }

  onClickDeleteElement(){
    this.openDialogService.openElementConfirmDialog(this.selectedElementTable, this.selectedNavBar, DialogMode.DELETE).closed.subscribe( result => {
      if (result == DialogResult.ACCEPT)
        this.researchPage.emit();
    })
  }

  onClickReport(){
    //ToDO тут что вообще будет то?
  }
}
