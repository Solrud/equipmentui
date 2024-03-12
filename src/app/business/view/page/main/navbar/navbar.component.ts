import {Component, OnInit} from '@angular/core';
import {TableData, TableType} from "../../../../../app.constant";
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {KomplService} from "../../../../data/service/implements/kompl.service";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {ModelService} from "../../../../data/service/implements/model.service";
import {OborudEkzService} from "../../../../data/service/implements/oborud-ekz.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

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
    private oborudEkzService: OborudEkzService,
    private eventService: EventService
    ) {}

  ngOnInit(): void {
    this.eventService.selectedSpravTable$.subscribe((result: TableType) => {
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

  //ToDo Сделать постраничную таблику

  onClickNavKompl(){
    if (this.selectedSpravochnik != TableType.KOMPL || this.isFirstTimeInitNav){

      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.KOMPL) : this.isFirstTimeInitNav = false;

      this.dataTableNavSource = [];
      console.log('111111searchAll Komplex');
      this.komplService.searchAll().subscribe( result => {
        console.log('2222222searchAll Komplex');
        this.dataTableNavSource = result;


        this.fieldColumnList = ['akt', 'id', 'kod', 'naim'];

        this._nextDataTable();
      }),
        error => {
        console.log(error)
        }
    }
  }



  onClickNavGruppa(){
    if (this.selectedSpravochnik != TableType.GRUPPA || this.isFirstTimeInitNav){

      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.GRUPPA) : this.isFirstTimeInitNav = false;

      this.dataTableNavSource = [];


      this.gruppaService.searchAll().subscribe( result => {
        console.log('searchAll Gruppa');

        this.dataTableNavSource = result;

        this.fieldColumnList = ['akt', 'id', 'kod', 'kodKlass', 'modely', 'naim', 'rod', 'tip', 'vid'];

        this._nextDataTable();
      })
    }
  }

  onClickNavModel(){
    if (this.selectedSpravochnik != TableType.MODEL || this.isFirstTimeInitNav){
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.MODEL) : this.isFirstTimeInitNav = false;

      this.dataTableNavSource = [];
      this.modelService.searchAll().subscribe( result => {
        console.log('searchAll Model');

        this.dataTableNavSource = result;

        this.fieldColumnList = ['akt', 'ekzemplary', 'id', 'kod', 'naim', 'obozn', 'tip'];

        this._nextDataTable();
      })

    }
  }

  onClickNavOborudEkz(){
    if (this.selectedSpravochnik != TableType.OBORUD_EKZ || this.isFirstTimeInitNav){

      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.OBORUD_EKZ) : this.isFirstTimeInitNav = false;

      this.dataTableNavSource = [];
      this.oborudEkzService.searchAll().subscribe( result => {
        console.log('searchAll OborudEkz');

        this.dataTableNavSource = result;
        this.fieldColumnList = ['akt', 'id', 'invNom', 'model', 'naim', 'podr', 'proizv', 'serNom', 'uch'];


          this._nextDataTable();
      }
      )
    }
  }

  // isResponseNotEmpty(fields: [], data: []){
  //   if ()
  // }

  _nextDataTable(){
    this.eventService.pushTableDataSource$(this.fieldColumnList, this.dataTableNavSource);
  }
}
