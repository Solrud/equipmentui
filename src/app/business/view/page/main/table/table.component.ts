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
  // @Input()
  // selectedSpravochnik: string;

  tableType = TableType

  //даные, столбцы
  // @Input()
  selectedSpavochnik: TableType | string | null = null;
  // @Input()
  fieldColumnList = [];
  // @Input()
  dataTableSource = [];

  constructor(
    private gruppaService: GruppaService,
    private komplService: KomplService,
    private modelService: ModelService,
    private oborudEkzService: OborudEkzService,
  ) { }

  ngOnInit(): void {
    EventService.selectedSpravTable$.subscribe(result => {
      result ? this.selectedSpavochnik = result : null;
    });

    EventService.tableDataSource$.subscribe(result => {

      if (result.dataTableNavSource.length > 0 && result.fieldColumnList.length > 0){
        this.dataTableSource = result.dataTableNavSource;
        this.fieldColumnList = result.fieldColumnList;
        // for (let i of result.dataTableNavSource){
        //   this.dataTableSource.push(i);
        // }
        //  for (let i of result.fieldColumnList){
        //   this.fieldColumnList.push(i);
        // }

      } else {
        console.log('пустой дата сурс в табличке')
      }

      console.log(this.fieldColumnList);
      console.log(this.dataTableSource);
    })


  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  isDataSourceFull(): boolean{
    return !!(this.dataTableSource.length > 0 && this.dataTableSource);
  }

}

