import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {TableType} from "../../../../../app.constant";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {KomplService} from "../../../../data/service/implements/kompl.service";
import {ModelService} from "../../../../data/service/implements/model.service";
import {OborudEkzService} from "../../../../data/service/implements/oborud-ekz.service";
import {PodrService} from "../../../../data/service/implements/podr.service";
import {ProizvService} from "../../../../data/service/implements/proizv.service";
import {UchService} from "../../../../data/service/implements/uch.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges{
  // @Input()
  // selectedSpravochnik: string;

  //даные, столбцы
  dataTableSource = []
  fieldColumnList: string[]

  tableType = TableType

  @Input()
  selectedSpavochnik: string | null = null;

  constructor(
    private gruppaService: GruppaService,
    private komplService: KomplService,
    private modelService: ModelService,
    private oborudEkzService: OborudEkzService,
    private podrService: PodrService,
    private proizvService: ProizvService,
    private uchService: UchService
  ) { }

  ngOnInit(): void {
    // EventService.selectedSpravTable.pipe().subscribe(result => {
    //   result ? this.selectedSpavochnik = result : this.selectedSpavochnik = null;
    //
    //   this.onLoadingDataTable();
    // })


  }

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes['selectedSpavochnik'].previousValue == undefined){
    // if(changes['selectedSpavochnik'].currentValue != changes['selectedSpavochnik'].previousValue){
    if(true){
      console.log('changes ', changes['selectedSpavochnik'])
      console.log('\x1b[33m%s\x1b[0m','current ' + this.selectedSpavochnik)
      this.onLoadingDataTable();

    }

    //TODO ПОЧЕМУ 3 РАЗА ПРИХОДЯТ CHANGES
  }


  onLoadingDataTable(){
    console.log('onLoadingTable ==', this.selectedSpavochnik)
    switch (this.selectedSpavochnik) {
      case TableType.OBORUD_EKZ:
        this.fieldColumnList = ['akt', 'id', 'invNom', 'model', 'naim', 'podr', 'proizv', 'serNom', 'uch'];

        this.dataTableSource = [];
        this.oborudEkzService.searchAll().subscribe(result => {
          console.log(result);

          for(let stackOf100 of result){
            this.dataTableSource.push(stackOf100);
          }
          console.log('TYT DATASOURCE -V-')
          console.log(this.dataTableSource)
        })
        break;

      case TableType.MODEL:
        console.log('попала в модель')
        this.fieldColumnList = ['akt', 'ekzemplary', 'id', 'kod', 'naim', 'obozn', 'tip'];
        this.modelService.searchAll().subscribe(result => {
          console.log(result);

          this.dataTableSource = [];
          for(let stackOf100 of result){
            this.dataTableSource.push(stackOf100);
          }
        })
        break;
      case TableType.GRUPPA:
        // this.fieldColumnList = ['akt', 'id', 'kod', 'kodKlass', 'modely', 'naim', 'rod', 'tip', 'vid'];


        break;
      case TableType.KOMPL:
        // this.fieldColumnList = ['akt', 'id', 'kod', 'naim'];
        break;

      default:

        break;
    }
    //toDo загрузка таблиц по нав табам + позже круг загрузки
  }
}

