import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {TableType} from "../../../../../app.constant";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {KomplService} from "../../../../data/service/implements/kompl.service";
import {ModelService} from "../../../../data/service/implements/model.service";
import {OborudEkzService} from "../../../../data/service/implements/oborud-ekz.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges{
  tableType = TableType

  //даные, столбцы
  // @Input()
  selectedSpavochnik: TableType | string | null = null;
  // @Input()
  fieldColumnList = [];
  // @Input()
  dataTableSource = [];

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit TABLE.COMPONENT')
    this.eventService.selectedSpravTable$.subscribe(result => {
      result ? this.selectedSpavochnik = result : null;
      console.log(result)
    });

    this.eventService.tableDataSource$.subscribe(result => {

      this.dataTableSource = result.dataTableNavSource.length > 0 ? result.dataTableNavSource : []
      this.fieldColumnList = result.fieldColumnList.length > 0 ? result.fieldColumnList : []

      console.log(this.fieldColumnList);
      console.log(this.dataTableSource);
    })


  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  isDataSourceFull(): boolean{
    return this.dataTableSource.length > 0;
  }

}

