import {Component, OnInit} from '@angular/core';
import {TableData, TableType} from "../../../../../app.constant";
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {KomplService} from "../../../../data/service/implements/kompl.service";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {ModelService} from "../../../../data/service/implements/model.service";
import {OborudEkzService} from "../../../../data/service/implements/oborud-ekz.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  tableType = TableType;
  selectedSpravochnik: TableType;

  //Данные передающиеся в инпут таблицы
  dataTableNavSource = [];
  fieldColumnList = [];

  isFirstTimeInitNav: boolean = true;

  searchTable
  constructor(
    private komplService: KomplService,
    private gruppaService: GruppaService,
    private modelService: ModelService,
    private oborudEkzService: OborudEkzService
    ) {}

  ngOnInit(): void {
    EventService.selectedSpravTable$.subscribe((result: TableType) => {
      this.selectedSpravochnik = result;

      switch (result){
        case  TableType.KOMPL:
          this.onClickNavKompl();
          break;
        case TableType.GRUPPA:
          this.onClickNavGruppa();
          break;
        case TableType.MODEL:
          this.onClickNavModel();
          break;
        case TableType.OBORUD_EKZ:
          this.onClickNavOborudEkz();
          break;

      }
    })
  }

  //ToDo этот комопнент будет смарт для таблицы.
  // На каждую вкладку отдельный метод (а не свитч-кейс как в app-table),
  // отправляет в каждом методе свой запрос на сервер,
  // в компонент таблицу пойдут дамп данные с апи, заголовки для таблицы.

  //ToDo mat-spinner сделать поверх страницы, отображать посередине

  onClickNavKompl(){
    if (this.selectedSpravochnik != TableType.KOMPL || this.isFirstTimeInitNav){

      !this.isFirstTimeInitNav ? EventService.selectedSpravTable$.next(TableType.KOMPL) : this.isFirstTimeInitNav = false;

      this.dataTableNavSource = [];
      this.komplService.searchAll().subscribe( result => {
        console.log('searchAll Komplex');

        for(let stack of result){
          this.dataTableNavSource.push(stack);
        }

        this.fieldColumnList = ['akt', 'id', 'kod', 'naim'];

        this._nextDataTable();
      })
    }
  }



  onClickNavGruppa(){
    if (this.selectedSpravochnik != TableType.GRUPPA || this.isFirstTimeInitNav){

      !this.isFirstTimeInitNav ? EventService.selectedSpravTable$.next(TableType.GRUPPA) : this.isFirstTimeInitNav = false;

      this.dataTableNavSource = [];
      this.gruppaService.searchAll().subscribe( result => {
        console.log('searchAll Gruppa');

        for(let stack of result){
          this.dataTableNavSource.push(stack);
        }

        this.fieldColumnList = ['akt', 'id', 'kod', 'kodKlass', 'modely', 'naim', 'rod', 'tip', 'vid'];

        this._nextDataTable();
      })
    }
  }

  onClickNavModel(){
    if (this.selectedSpravochnik != TableType.MODEL || this.isFirstTimeInitNav){
      !this.isFirstTimeInitNav ? EventService.selectedSpravTable$.next(TableType.MODEL) : this.isFirstTimeInitNav = false;

      this.dataTableNavSource = [];
      this.modelService.searchAll().subscribe( result => {
        console.log('searchAll Model');


        // for(let stack of result){
        //   this.dataTableNavSource.push(stack);
        // }

        this.dataTableNavSource = result;

        this.fieldColumnList = ['akt', 'ekzemplary', 'id', 'kod', 'naim', 'obozn', 'tip'];

        this._nextDataTable();
      })

    }
  }

  onClickNavOborudEkz(){
    if (this.selectedSpravochnik != TableType.OBORUD_EKZ || this.isFirstTimeInitNav){

      !this.isFirstTimeInitNav ? EventService.selectedSpravTable$.next(TableType.OBORUD_EKZ) : this.isFirstTimeInitNav = false;

      this.dataTableNavSource = [];
      this.oborudEkzService.searchAll().subscribe( result => {
        console.log('searchAll OborudEkz');

        // for(let stack of result){
        //   this.dataTableNavSource.push(stack);
        // }

        this.dataTableNavSource = result;
        this.fieldColumnList = ['akt', 'id', 'invNom', 'model', 'naim', 'podr', 'proizv', 'serNom', 'uch'];


          this._nextDataTable();
      }
      )
    }
  }

  _nextDataTable(){
    EventService.tableDataSource$.next(new TableData(this.fieldColumnList, this.dataTableNavSource));
  }
}
