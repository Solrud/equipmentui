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
  tableType = TableType;

  isFirstTimeInitNav: boolean = true; //Флаг, в первый ли раз открывается вкладка типа таблицы

  selectedSpravochnik: TableType; //Выбранный сейчас тип вкладки || таблицы

  //Данные передающиеся в инпут таблицы
  dataTableNavSource = [];
  fieldColumnList = [];
  totalFoundedElements: number;

  //Поисковые обьекты
  dataSearch: KomplSearchDTO | GruppaSearchDTO | ModelSearchDTO | OborudEkzSearchDTO; //Один поисковой обьект, который идет в компонент таблицы
  komplSearch: KomplSearchDTO;
  gruppaSearch: GruppaSearchDTO;
  modelSearch: ModelSearchDTO;
  oborudEkzSearch: OborudEkzSearchDTO;


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
    this.initSearchData();
    this._subscribeToSelectedSpravochnik();
  }

  //ToDo =>
  // !!!сделать выбор элемента в таблице и взаимодействие(добавить, редактировать, удалить) с ним через модалки
  // !!!сделать диалоги с полями форм филдами и группой
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

  initSearchData(){
    if(!this.komplSearch) this.komplSearch = new KomplSearchDTO();
    if(!this.gruppaSearch) this.gruppaSearch = new GruppaSearchDTO();
    if(!this.modelSearch) this.modelSearch = new ModelSearchDTO();
    if(!this.oborudEkzSearch) this.oborudEkzSearch = new OborudEkzSearchDTO();
  }

  _nextDataTable(){
    this.eventService.pushTableDataSource$(this.fieldColumnList, this.dataTableNavSource);
  }

  _subscribeToSelectedSpravochnik(){
    this.eventService.selectedSpravTable$.subscribe((result: TableType) => {
      this.selectedSpravochnik = result;
      this.eventService.selectElementTable$(null);

      this.initNavBar(result);
    })
  }

  initNavBar(selectedNavBar: TableType, isChangePage: boolean = false, pageEvent: PageEvent = null){
    switch (selectedNavBar){
      case  TableType.KOMPL:
        this.onClickNavKompl();
        break;
      case TableType.GRUPPA:
        this.onClickNavGruppa(isChangePage, pageEvent);
        break;
      case TableType.MODEL:
        this.onClickNavModel(isChangePage, pageEvent);
        break;
      case TableType.OBORUD_EKZ:
        this.onClickNavOborudEkz(isChangePage, pageEvent);
        break;
    }
  }

  toggleSidenavOpened(): void{
    this.drawerComponent?.toggle();
  }

  openTestDialog(): void{
    this.openDialogService.openRelationshipCardDialog();
  }


  // Методы Вкладки
  onClickNavKompl(isChangePage: boolean = false, pageEvent: PageEvent = null): void{
    if (this.selectedSpravochnik != TableType.KOMPL || this.isFirstTimeInitNav || isChangePage){
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.KOMPL) : this.isFirstTimeInitNav = false;

      if(isChangePage && pageEvent)
        this.changeDataPage(this.modelSearch, pageEvent);


      this.dataSearch = this.komplSearch;
      this.dataTableNavSource = [];
      this.komplService.searchPage(this.komplSearch).subscribe(result => {
        this.totalFoundedElements = result.totalElements;
        this.dataTableNavSource = result.content;

        this.fieldColumnList = FIELD_COLUMN_KOMPL_LIST;
      })
    }
  }



  onClickNavGruppa(isChangePage: boolean = false, pageEvent: PageEvent = null): void{
    if (this.selectedSpravochnik != TableType.GRUPPA || this.isFirstTimeInitNav || isChangePage){
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.GRUPPA) : this.isFirstTimeInitNav = false;

      if(isChangePage && pageEvent)
        this.changeDataPage(this.gruppaSearch, pageEvent);


      this.dataSearch = this.gruppaSearch;
      this.dataTableNavSource = [];
      this.gruppaService.searchPage(this.gruppaSearch).subscribe(result => {
        this.totalFoundedElements = result.totalElements;
        this.dataTableNavSource = result.content;
        // this.dataTableNavSource = result.content.map( data => {
        //   return {
        //     ...data,
        //     'modely': data.modely.map( item => item?.naim),
        //     'vid': data.vid?.naim
        //   }
        // })

        this.fieldColumnList = FIELD_COLUMN_GRUPPA_LIST;
      })
    }
  }

  onClickNavModel(isChangePage: boolean = false, pageEvent: PageEvent = null): void{
    if (this.selectedSpravochnik != TableType.MODEL || this.isFirstTimeInitNav || isChangePage){
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.MODEL) : this.isFirstTimeInitNav = false;

      if(isChangePage && pageEvent)
        this.changeDataPage(this.modelSearch, pageEvent);


      this.dataSearch = this.modelSearch;
      this.dataTableNavSource = [];
      this.modelService.searchPage(this.modelSearch).subscribe(result => {
        this.totalFoundedElements = result.totalElements;
        this.dataTableNavSource = result.content;
        // this.dataTableNavSource = result.content.map( data => {
        //         return {
        //           ...data,
        //           'ekzemplary': data.ekzemplary.map( item => item.naim),
        //         }
        // });
        this.fieldColumnList = FIELD_COLUMN_MODEL_LIST;
      })
    }
  }

  onClickNavOborudEkz(isChangePage: boolean = false, pageEvent: PageEvent = null): void{
    if (this.selectedSpravochnik != TableType.OBORUD_EKZ || this.isFirstTimeInitNav || isChangePage){
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.OBORUD_EKZ) : this.isFirstTimeInitNav = false;

      if(isChangePage && pageEvent)
        this.changeDataPage(this.oborudEkzSearch, pageEvent);


      this.dataSearch = this.oborudEkzSearch;
      this.dataTableNavSource = [];
      this.oborudEkzService.searchPage(this.oborudEkzSearch).subscribe(result => {
        this.totalFoundedElements = result.totalElements;
        this.dataTableNavSource = result.content;

        // this.dataTableNavSource = result.content.map( data => {
        //   return {
        //     ...data,
        //     'model': data.model?.naim,
        //     'podr': data.podr?.naim,
        //     'proizv': data.proizv?.naim,
        //     'uch': data.uch?.naim
        //   }
        // });

        this.fieldColumnList = FIELD_COLUMN_OBORUD_EKZ_LIST;
      })
    }
  }


  onChangePage(pageEvent: PageEvent): void{ //output изменения пагинации таблицы
    this.initNavBar(this.selectedSpravochnik, true, pageEvent);
  }

  changeDataPage(search: KomplSearchDTO | GruppaSearchDTO | ModelSearchDTO | OborudEkzSearchDTO, pageEvent: PageEvent){ // передает данные
    search.pageSize !== pageEvent.pageSize ?
      search.pageNumber = 0 : search.pageNumber = pageEvent.pageIndex;
    search.pageSize = pageEvent.pageSize;
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
