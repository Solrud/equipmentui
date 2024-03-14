import {Component, OnInit} from '@angular/core';
import {
  FIELD_COLUMN_GRUPPA_LIST,
  FIELD_COLUMN_KOMPL_LIST,
  FIELD_COLUMN_MODEL_LIST,
  FIELD_COLUMN_OBORUD_EKZ_LIST,
  TableType
} from "../../../../../app.constant";
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {KomplService} from "../../../../data/service/implements/kompl.service";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {ModelService} from "../../../../data/service/implements/model.service";
import {OborudEkzService} from "../../../../data/service/implements/oborud-ekz.service";
import {GruppaSearchDTO} from "../../../../data/model/search/impl/GruppaSearchDTO";
import {ModelSearchDTO} from "../../../../data/model/search/impl/ModelSearchDTO";

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

  dataSearchGruppa: GruppaSearchDTO;
  dataSearchModel: ModelSearchDTO;


  constructor(
    private komplService: KomplService,
    private gruppaService: GruppaService,
    private modelService: ModelService,
    private oborudEkzService: OborudEkzService,
    private eventService: EventService
    ) {}

  ngOnInit(): void {
    if (!this.dataSearchGruppa) this.dataSearchGruppa = new GruppaSearchDTO();
    if (!this.dataSearchModel) this.dataSearchModel = new ModelSearchDTO();


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



  //ToDo
  // сделать диалоги с полями форм филдами и группой
  // постраничность, <mat-paginator> сделать
  // перенести нав бар из отдельного компонента в боди
  // думать про архитектуру
  // DTO<any> переделать
  // в конце концов не забыть про i18n


  onClickNavKompl(){
    if (this.selectedSpravochnik != TableType.KOMPL || this.isFirstTimeInitNav){

      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.KOMPL) : this.isFirstTimeInitNav = false;

      this.dataTableNavSource = [];
      this.komplService.searchAll().subscribe( result => {
        this.dataTableNavSource = result;

        this.fieldColumnList = FIELD_COLUMN_KOMPL_LIST;

        this._nextDataTable();
      })
    }
  }



  onClickNavGruppa(){
    if (this.selectedSpravochnik != TableType.GRUPPA || this.isFirstTimeInitNav){

      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.GRUPPA) : this.isFirstTimeInitNav = false;

      this.dataTableNavSource = [];
      this.gruppaService.searchPage(this.dataSearchGruppa).subscribe(result => {
        this.dataTableNavSource = result.map( data => {
          return {
            ...data,
            'modely': data.modely.map( item => item?.naim),
            'vid': data.vid?.naim
          }
        })

        this.fieldColumnList = FIELD_COLUMN_GRUPPA_LIST;

        this._nextDataTable();
      })
    }
  }

  onClickNavModel(){
    if (this.selectedSpravochnik != TableType.MODEL || this.isFirstTimeInitNav){
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.MODEL) : this.isFirstTimeInitNav = false;

      this.dataTableNavSource = [];
      this.modelService.searchPage(this.dataSearchModel).subscribe( result => {
        console.log('searchAll Model');

        this.dataTableNavSource = result.map( data => {
          return {
            ...data,
            'ekzemplary': data.ekzemplary.map( item => item.naim),
          }
        });

        this.fieldColumnList = FIELD_COLUMN_MODEL_LIST;

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

        this.dataTableNavSource = result.map( data => {
          return {
            ...data,
            'model': data.model?.naim,
            'podr': data.podr?.naim,
            'proizv': data.proizv?.naim,
            'uch': data.uch?.naim
          }
        });
        this.fieldColumnList = FIELD_COLUMN_OBORUD_EKZ_LIST;

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
