import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {TableType} from "../../../../../app.constant";
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {OborudEkzService} from "../../../../data/service/implements/oborud-ekz.service";
import {OpenDialogService} from "../../../../data/service/OptionalService/open-dialog.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  showFiller = false;
  tableType = Object.keys(TableType);
  tabTyp = TableType;
  tabMatIndex = 0;

  selectedSpavochnik: string;
  isTableDataNotEmpty: boolean = false;

  @ViewChild(MatDrawer)
  private readonly drawerComponent?: MatDrawer;

  constructor(private oborudEkzService: OborudEkzService,
              private eventService: EventService,
              private openDialogService: OpenDialogService) {
  }

  ngOnInit(): void {
    this._isTableDataNotEmpty();
  }

  _isTableDataNotEmpty(){
    this.eventService.tableDataSource$.subscribe(result => {
      result.dataTableNavSource.length > 0 && result.fieldColumnList.length > 0 ? this.isTableDataNotEmpty = true : this.isTableDataNotEmpty = false;
    })
  }

  toggleSidenavOpened(){
    this.drawerComponent?.toggle();
  }

  onClickChooseTable(type: string){
    this.selectedSpavochnik = type;
  }

  openTestDialog(){
    this.openDialogService.openEquipmentDialog();
  }
}
