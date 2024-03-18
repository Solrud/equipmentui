import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {
  FIELD_COLUMN_GRUPPA_LIST,
  FIELD_COLUMN_KOMPL_LIST,
  FIELD_COLUMN_MODEL_LIST, FIELD_COLUMN_OBORUD_EKZ_LIST,
  TableType
} from "../../../../../app.constant";
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {OborudEkzService} from "../../../../data/service/implements/oborud-ekz.service";
import {OpenDialogService} from "../../../../data/service/OptionalService/open-dialog.service";
import {GruppaSearchDTO} from "../../../../data/model/search/impl/GruppaSearchDTO";
import {ModelSearchDTO} from "../../../../data/model/search/impl/ModelSearchDTO";
import {KomplService} from "../../../../data/service/implements/kompl.service";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {ModelService} from "../../../../data/service/implements/model.service";
import {KomplSearchDTO} from "../../../../data/model/search/impl/KomplSearchDTO";
import {OborudEkzSearchDTO} from "../../../../data/model/search/impl/OborudEkzSearchDTO";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  // tableType = Object.keys(TableType);
  tabTyp = TableType;
  tabMatIndex = 0;

  // selectedSpavochnik: string;
  // isTableDataNotEmpty: boolean = false;


  tableType = TableType;

  selectedSpravochnik: TableType;
  //Данные передающиеся в инпут таблицы
  dataTableNavSource = [];
  fieldColumnList = [];
  totalFoundedElements: number;

  isFirstTimeInitNav: boolean = true;

  dataSearch: any;

  @ViewChild(MatDrawer)
  private readonly drawerComponent?: MatDrawer;

  constructor(private eventService: EventService,
              private openDialogService: OpenDialogService,
              private komplService: KomplService,
              private gruppaService: GruppaService,
              private modelService: ModelService,
              private oborudEkzService: OborudEkzService,
              ) {
  }

  ngOnInit(): void {
    this._subscribeToSelectedSpravochnik();
  }

  //ToDo =>
  // Переделать передачу данных с бекенда на компонент таблицы в input, а не через rxJs
  // сделать диалоги с полями форм филдами и группой
  // постраничность, <mat-paginator> сделать /когда бекенд заработает/
  // думать про архитектуру
  // DTO<any> переделать придумать
  // как отображать доп таблички(какие данные нужны, как отображать их бордеры, до доп кнопки взаимодействия)
  // при выборе записи выводить дочерние привязанные таблицы(не знаю как)
  // -
  // =>-ОПЦИОНАЛЬНО-<=
  // опционально добавить кнопочку новостей разработки со всплывающей модалкой
  // перевод mat-paginator, взять из https://gitlab.avid.ru/mikishev/bienieui/blob/develop/1.0.1-secure/src/app/busines/intl/MyMatPaginatorIntl.ts и i18n оттуда
  // в конце концов не забыть про i18n
  // -
  // =>-ПОЧЕМУ ОШИБКА-<=
  // почему в dataSearch не получается тип: GruppaSearchDTO | ModelSearchDTO и тд (пока any)
  // -
  // =>-ВОПРОС-<=
  // ! Неактивные показывать но с зачеркиванием, выделением другого цвета
  // ! СПРОСИТЬ: при инициализации(первом открытии сайта) нужно ли выбирать 1 из списка по умолчанию выбранным. НЕ НАДО
  // ! СПРОСИТЬ: нужно ли выводить всем списком строки таблиц, если да, то нужно принимать урезанные данные. БУДЕТ п поумолчанию столько строк, сколько входит и "Все"
  // ? СПРОСИТЬ: Какие вкладки нужны, почему в базисе димы есть еще другие таблицы

  _subscribeToSelectedSpravochnik(){
    this.eventService.selectedSpravTable$.subscribe((result: TableType) => {
      this.selectedSpravochnik = result;

      this.initNavBar(result);
    })
  }

  initNavBar(selectedNavBar: TableType, isChangePage: boolean = false){
    switch (selectedNavBar){
      case  TableType.KOMPL:
        this.onClickNavKompl();
        break;
      case TableType.GRUPPA:
        this.onClickNavGruppa(isChangePage);
        break;
      case TableType.MODEL:
        this.onClickNavModel();
        break;
      case TableType.OBORUD_EKZ:
        this.onClickNavOborudEkz();
        break;
    }
  }

  toggleSidenavOpened(): void{
    this.drawerComponent?.toggle();
  }

  openTestDialog(): void{
    this.openDialogService.openEquipmentDialog();
  }


  // Методы Вкладки
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



  onClickNavGruppa(isChangePage: boolean = false): void{
    if (this.selectedSpravochnik != TableType.GRUPPA || this.isFirstTimeInitNav || isChangePage){
      // if (!this.dataSearch || !this.dataSearch) this.dataSearch = new GruppaSearchDTO();
      if(!isChangePage) this.dataSearch = new GruppaSearchDTO();

      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.GRUPPA) : this.isFirstTimeInitNav = false;

      this.dataTableNavSource = [];
      this.gruppaService.searchPage(this.dataSearch).subscribe(result => {
        // console.log(result);
        this.totalFoundedElements = result.totalElements;
        this.dataTableNavSource = result.content.map( data => {
          return {
            ...data,
            'modely': data.modely.map( item => item?.naim),
            'vid': data.vid?.naim
          }
        })

        this.fieldColumnList = FIELD_COLUMN_GRUPPA_LIST;


        // this._nextDataTable();
      })
    }
  }

  onClickNavModel(){
    if (this.selectedSpravochnik != TableType.MODEL || this.isFirstTimeInitNav){
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.MODEL) : this.isFirstTimeInitNav = false;

      this.dataTableNavSource = [];
      this.modelService.searchAll().subscribe( result => {
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

  onChangePage(pageEvent: PageEvent): void{
    console.log(pageEvent)
    this.dataSearch.pageSize !== pageEvent.pageSize ?
      this.dataSearch.pageNumber = 0 : this.dataSearch.pageNumber = pageEvent.pageIndex;

    this.dataSearch.pageSize = pageEvent.pageSize;

    this.initNavBar(this.selectedSpravochnik, true);
  }

  //ToDo
  // pageEvent.pageSize = Кол-во элементов на 1 странице таблицы
  // pageEvent.length = Общее число всех элементов таблицы
  // pageEvent.pageIndex = На какой сранице сейчас пользователь
  // pageEvent.previousPageIndex = Предыдущая страница с которой перешел пользователь


  // numberOfElements = Кол-во элементов на 1 странице таблицы
  // number = На какой странице сейчас пользователь
  // totalElements = Общее число всех элементов таблицы
  // totalPages = Общее число страниц таблицы
}
