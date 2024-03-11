import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {TableType} from "../../../../../app.constant";
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {OborudEkzService} from "../../../../data/service/implements/oborud-ekz.service";

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

  constructor(private oborudEkzService: OborudEkzService) {
  }

  ngOnInit(): void {
    this._isTableDataNotEmpty();
  }

  _isTableDataNotEmpty(){
    EventService.tableDataSource$.subscribe(result => {
      result.dataTableNavSource.length > 0 && result.fieldColumnList.length > 0 ? this.isTableDataNotEmpty = true : this.isTableDataNotEmpty = false;
    })
  }

  toggleSidenavOpened(){
    this.drawerComponent?.toggle();
  }

  test() {
    this.oborudEkzService.searchAll().subscribe(res => {
      console.log(res)
    })
  }

  onClickChooseTable(type: string){
    this.selectedSpavochnik = type;
  }
}
