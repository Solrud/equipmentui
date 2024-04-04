import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {OriginSourceTable, TableType} from "../../../../../app.constant";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ABaseSearchDTO} from "../../../../data/model/search/ABaseSearchDTO";
import {MatTableDataSource} from "@angular/material/table";

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
  @Input()
  originSourceTable: OriginSourceTable;

  @Output()
  dataSearchNew: EventEmitter<ABaseSearchDTO> = new EventEmitter<ABaseSearchDTO>();

  selectedElement: any;

  previewResultValues = new MatTableDataSource();

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    console.log(this.dataTableSource)
  }

  @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator){
    null
  }

  public get TableType(){
    return TableType;
  }
  public get OriginSourceTable(){
    return OriginSourceTable;
  }


  isDataSourceFull(): boolean{
    return this.dataTableSource.length > 0;
  }

  onClickPageChanged(pageEvent: PageEvent){
    this.dataSearch.pageSize !== pageEvent.pageSize ?
      this.dataSearch.pageNumber = 0 : this.dataSearch.pageNumber = pageEvent.pageIndex;
    this.dataSearch.pageSize = pageEvent.pageSize;
    this.dataSearchNew.emit(this.dataSearch);
  }

  onSelectElementTable(selectedElement: any){
    this.selectedElement = selectedElement;
    switch (this.originSourceTable) {
      case OriginSourceTable.MAIN_TABLE:
        this.eventService.selectElementMainTable$(selectedElement);
        break;
      case OriginSourceTable.SETTINGS_TABLE:
        break;
      case OriginSourceTable.RELATIONSHIP_TABLE:
        break;
    }
  }
// pageEvent.pageSize = Кол-во элементов на 1 странице таблицы
  // pageEvent.length = Общее число всех элементов таблицы
  // pageEvent.pageIndex = На какой сранице сейчас пользователь
  // pageEvent.previousPageIndex = Предыдущая страница с которой перешел пользователь


  // numberOfElements = Кол-во элементов на 1 странице таблицы
  // number = На какой странице сейчас пользователь
  // totalElements = Общее число всех элементов таблицы
  // totalPages = Общее число страниц таблицы
}

