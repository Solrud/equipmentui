import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {TableType} from "../../../../../app.constant";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {KomplService} from "../../../../data/service/implements/kompl.service";
import {ModelService} from "../../../../data/service/implements/model.service";
import {OborudEkzService} from "../../../../data/service/implements/oborud-ekz.service";
import {GruppaSearchDTO} from "../../../../data/model/search/impl/GruppaSearchDTO";
import {KomplSearchDTO} from "../../../../data/model/search/impl/KomplSearchDTO";
import {ModelSearchDTO} from "../../../../data/model/search/impl/ModelSearchDTO";
import {OborudEkzSearchDTO} from "../../../../data/model/search/impl/OborudEkzSearchDTO";
import {PageEvent} from "@angular/material/paginator";
import {ABaseSearchDTO} from "../../../../data/model/search/ABaseSearchDTO";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  tableType = TableType

  @Input()
  selectedSpavochnik: TableType | string | null = null;
  @Input()
  fieldColumnList = [];
  @Input()
  dataTableSource = [];
  @Input()
  dataSearch: ABaseSearchDTO | null;
  @Input()
  totalFoundedElements: number;

  @Output()
  pagingEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  selectedElement: any;

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit TABLE.COMPONENT')

    console.log('TABLE.selectedSpavochnik')
    console.log(this.selectedSpavochnik)
    console.log('TABLE.fieldColumnList')
    console.log(this.fieldColumnList)
    console.log('TABLE.dataTableSource')
    console.log(this.dataTableSource)
    console.log('TABLE.dataSearch')
    console.log(this.dataSearch)
  }


  _initTableDataSource(){
    this.eventService.tableDataSource$.subscribe(result => {
      this.dataTableSource = result.dataTableNavSource.length > 0 ? result.dataTableNavSource : []
      this.fieldColumnList = result.fieldColumnList.length > 0 ? result.fieldColumnList : []
    })
  }

  isDataSourceFull(): boolean{
    return this.dataTableSource.length > 0;
  }

  onClickPageChanged(pageEvent: PageEvent){
    this.pagingEvent.emit(pageEvent);
  }

  onSelectElementTable(selectedElement: any){
    this.selectedElement = selectedElement;
    this.eventService.selectElementTable$(selectedElement);
  }

}

