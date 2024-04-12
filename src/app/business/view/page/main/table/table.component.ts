import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
export class TableComponent implements OnInit, OnChanges{
  tableType = TableType

  @Input()
  selectedSpavochnik: TableType | string | null = null;
  @Input()
  fieldColumnList = [];
  @Input()
  dataTableSource: any;
  @Input()
  dataSearch: ABaseSearchDTO | null;
  @Input()
  totalFoundedElements: number;
  @Input()
  originSourceTable: OriginSourceTable;
  @Input()
  isUchNotEmptyInPodr: boolean = false;

  @Output()
  dataSearchNew: EventEmitter<ABaseSearchDTO> = new EventEmitter<ABaseSearchDTO>();
  @Output()
  chosenElementObj: EventEmitter<any> = new EventEmitter<any>();

  selectedElement: any;

  previewResultValues = new MatTableDataSource();
  private paginator: MatPaginator;

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    // console.log(this.dataTableSource)
    this._subscribeMainSelectedEl();
    //ToDo нужно ли восставнавливать на таблицах, какой выбранный жлемент был? только в настройках наверное
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
  }

  _subscribeMainSelectedEl(){
    this.eventService.selectedElementMainTable$.subscribe( result => {
      if (this.originSourceTable === OriginSourceTable.RELATIONSHIP_TABLE){
        this.selectedElement = null;
      }
    })
  }

  public get TableType(){
    return TableType;
  }
  public get OriginSourceTable(){
    return OriginSourceTable;
  }

  toShowPaginator(): boolean{
    let result = false;
    if (this.dataTableSource?.length > 0) result = true;
    if (this.dataTableSource?.size > 0) result = true;
    return !!(result
      && this.originSourceTable !== OriginSourceTable.SETTINGS_TABLE
      && this.originSourceTable !== OriginSourceTable.RELATIONSHIP_TABLE
      && this.originSourceTable !== OriginSourceTable.PRE_RELATION_TABLE)
  }

  isDataSourceFull(): boolean{
    let result = false;
    if (this.dataTableSource?.length > 0) result = true;
    if (this.dataTableSource?.size > 0) result = true;
    return result;
  }

  onAddRelatedElement(elementObj: any){
    // console.log(elementObj)
    // console.log(typeof elementObj)
    this.chosenElementObj.emit(elementObj);
  }

  onClickPageChanged(elementSearch: ABaseSearchDTO){
    this.dataSearch.pageSize !== elementSearch.pageSize ?
      this.dataSearch.pageNumber = 0 : this.dataSearch.pageNumber = elementSearch.pageNumber;
    this.dataSearch.pageSize = elementSearch.pageSize;
    this.dataSearchNew.emit(this.dataSearch);
  }

  onClickRemoveFromPrerelatedDataList(selectedForRemoveObj: any){
    this.eventService.selectPreRelatedElement$(selectedForRemoveObj);
  }

  //ToDo выбранный элемент остается если переключится на другой экземпляр в одной сущности, надо ли так

  onSelectElementTable(selectedElement: any){
    // console.log(selectedElement)
    this.selectedElement = selectedElement;
    switch (this.originSourceTable) {
      case OriginSourceTable.MAIN_TABLE:
        this.eventService.selectElementMainTable$(selectedElement);
        this.eventService.selectElementKomplRelationshipTable$(null);
        this.eventService.selectElementGruppaRelationshipTable$(null);
        this.eventService.selectElementModelRelationshipTable$(null);
        this.eventService.selectElementOborudEkzRelationshipTable$(null);
        break;
      case OriginSourceTable.SETTINGS_TABLE:
        if (this.selectedSpavochnik == TableType.OBORUD_KLASS)
          this.eventService.selectElementOborudKlassTable$(selectedElement);
        if (this.selectedSpavochnik == TableType.OBORUD_VID)
          this.eventService.selectElementOborudVidTable$(selectedElement);
        if (this.selectedSpavochnik == TableType.NAL_PU)
          this.eventService.selectElementNalPuTable$(selectedElement);
        if (this.selectedSpavochnik == TableType.GAB_ZO)
          this.eventService.selectElementGabZoTable$(selectedElement);
        if (this.selectedSpavochnik == TableType.PROIZV)
          this.eventService.selectElementProizvTable$(selectedElement);
        if (this.selectedSpavochnik == TableType.PODR)
          this.eventService.selectElementPodrTable$(selectedElement);
        if (this.selectedSpavochnik == TableType.UCH)
          this.eventService.selectElementUchTable$(selectedElement);
        break;
      case OriginSourceTable.RELATIONSHIP_TABLE:
        if (this.selectedSpavochnik === TableType.KOMPL_FROM_RELATION)
          this.eventService.selectElementKomplRelationshipTable$(selectedElement);
        if (this.selectedSpavochnik === TableType.GRUPPA_FROM_RELATION)
          this.eventService.selectElementGruppaRelationshipTable$(selectedElement);
        if (this.selectedSpavochnik === TableType.MODEL_FROM_RELATION)
          this.eventService.selectElementModelRelationshipTable$(selectedElement);
        if (this.selectedSpavochnik === TableType.OBORUD_EKZ_FROM_RELATION)
          this.eventService.selectElementOborudEkzRelationshipTable$(selectedElement);
        break;
      case OriginSourceTable.RELATION_SETTINGS:
        // if (this.selectedSpavochnik === )
        break;
      case OriginSourceTable.PRE_RELATION_TABLE:
        // this.eventService.selectPreRelatedElement(selectedElement);
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

