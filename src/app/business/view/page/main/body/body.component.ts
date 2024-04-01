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
import {ABaseSearchDTO} from "../../../../data/model/search/ABaseSearchDTO";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  tableType = TableType;

  temporarilyDisabledNavBar: boolean = false; // Флаг, чтобы не открывать другую таблицу во время загрузки данных с бекенда текуще открытой

  isFirstTimeInitNav: boolean = true; //Флаг, в первый ли раз открывается вкладка типа таблицы

  selectedSpravochnik: TableType; //Выбранный сейчас тип вкладки || таблицы

  //Данные передающиеся в инпут таблицы
  dataTableNavSource = [];
  fieldColumnList = [];
  totalFoundedElements: number;

  //Поисковые обьекты
  dataSearch: ABaseSearchDTO; //Один поисковой обьект, который идет в компонент таблицы
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
  // добавить DTO'шки и сервисы к частям кода классификатора
  // код классификатора изменился old(вид, группа, пу, габариты) СЕЙЧАС (классификатор, вид, ПУ, габариты), то есь вместо вида-классификатор и вместо группа-вид
  // !!!сделать выбор элемента в таблице и взаимодействие(добавить, редактировать, удалить) с ним через модалки
  // !!!сделать диалоги с полями форм филдами и группой
  // возвращение из таблицы выбранного элемента таблицы возможно стоит переделать под input
  // думать про архитектуру
  // DTO<any> переделать придумать
  // как отображать доп таблички(какие данные нужны, как отображать их бордеры, до доп кнопки взаимодействия)
  // при выборе записи выводить дочерние привязанные таблицы(не знаю как)
  // -
  // =>-ОПЦИОНАЛЬНО-<=
  // опционально добавить кнопочку новостей разработки со всплывающей модалкой
  // перевод mat-paginator, взять из https://gitlab.avid.ru/mikishev/bienieui/blob/develop/1.0.1-secure/src/app/busines/intl/MyMatPaginatorIntl.ts и i18n оттуда
  // в конце концов не забыть про i18n!
  // -
  // =>-ПОЧЕМУ ОШИБКА-<=
  // -
  // =>-ВОПРОС-<=
  // ! Неактивные показывать но с зачеркиванием, выделением другого цвета
  // ! СПРОСИТЬ: при инициализации(первом открытии сайта) нужно ли выбирать 1 из списка по умолчанию выбранным. НЕ НАДО
  // ! СПРОСИТЬ: нужно ли выводить всем списком строки таблиц, если да, то нужно принимать урезанные данные. БУДЕТ п поумолчанию столько строк, сколько входит и "Все"
  // ? СПРОСИТЬ: Какие вкладки нужны, почему в базисе димы есть еще другие таблицы
  // ? СПРОСИТЬ: Какие поля нужны в редактировании сущностей(тз и базис димы отличается)
  // Код классификатора нужно добавить в базу данных и редактировать

  initSearchData(){
    if(!this.komplSearch) this.komplSearch = new KomplSearchDTO();
    if(!this.gruppaSearch) this.gruppaSearch = new GruppaSearchDTO();
    if(!this.modelSearch) this.modelSearch = new ModelSearchDTO();
    if(!this.oborudEkzSearch) this.oborudEkzSearch = new OborudEkzSearchDTO();
  }

  // _nextDataTable(){
  //   this.eventService.pushTableDataSource$(this.fieldColumnList, this.dataTableNavSource);
  // }

  _subscribeToSelectedSpravochnik(){
    this.eventService.selectedSpravTable$.subscribe((result: TableType) => {
      this.selectedSpravochnik = result;
      this.eventService.selectElementTable$(null);

      this.initNavBar(result);
    })
  }

  initNavBar(selectedNavBar: TableType, newDataSearch: ABaseSearchDTO = null, reSearchPage: boolean = false){
    switch (selectedNavBar){
      case  TableType.KOMPL:
        this.onClickNavKompl(newDataSearch, reSearchPage);
        break;
      case TableType.GRUPPA:
        this.onClickNavGruppa(newDataSearch, reSearchPage);
        break;
      case TableType.MODEL:
        this.onClickNavModel(newDataSearch, reSearchPage);
        break;
      case TableType.OBORUD_EKZ:
        this.onClickNavOborudEkz(newDataSearch, reSearchPage);
        break;
    }
  }

  toggleSidenavOpened(): void{
    this.drawerComponent?.toggle();
  }

  openTestDialog(): void{
    // this.openDialogService.openGruppaElementEditDialog();
  }


  // Методы Вкладки
  onClickNavKompl(newDataSearch: ABaseSearchDTO = null, reSearchPage: boolean = false): void{
    if ((this.selectedSpravochnik != TableType.KOMPL || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.KOMPL) : this.isFirstTimeInitNav = false;

      if(newDataSearch && reSearchPage)
        this.toSetNewSearchFromPage(newDataSearch, this.komplSearch);

      this.dataSearch = this.komplSearch;
      this.dataTableNavSource = [];
      this.komplService.searchPage(this.komplSearch).subscribe(result => {
        this.totalFoundedElements = result.totalElements;
        this.dataTableNavSource = result.content;

        this.fieldColumnList = FIELD_COLUMN_KOMPL_LIST;
        this.temporarilyDisabledNavBar = false;
      })
    }
  }



  onClickNavGruppa(newDataSearch: ABaseSearchDTO = null, reSearchPage: boolean = false): void{
    if ((this.selectedSpravochnik != TableType.GRUPPA || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.GRUPPA) : this.isFirstTimeInitNav = false;
      if(newDataSearch && reSearchPage)
        this.toSetNewSearchFromPage(newDataSearch, this.gruppaSearch);

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
        this.temporarilyDisabledNavBar = false;
      })
    }
  }

  onClickNavModel(newDataSearch: ABaseSearchDTO = null, reSearchPage: boolean = false): void{
    if ((this.selectedSpravochnik != TableType.MODEL || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.MODEL) : this.isFirstTimeInitNav = false;

      if(newDataSearch && reSearchPage)
        this.toSetNewSearchFromPage(newDataSearch, this.modelSearch);

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
        this.temporarilyDisabledNavBar = false;
      })
    }
  }

  onClickNavOborudEkz(newDataSearch: ABaseSearchDTO = null, reSearchPage: boolean = false): void{
    if ((this.selectedSpravochnik != TableType.OBORUD_EKZ || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.OBORUD_EKZ) : this.isFirstTimeInitNav = false;

      if(newDataSearch && reSearchPage)
        this.toSetNewSearchFromPage(newDataSearch, this.oborudEkzSearch);

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
        this.temporarilyDisabledNavBar = false;
      })
    }
  }


  onChangePage(newDataSearch: ABaseSearchDTO): void{ //output изменения пагинации таблицы
    this.initNavBar(this.selectedSpravochnik, newDataSearch, true);
  }

  onReSearchPage(){
    this.initNavBar(this.selectedSpravochnik, null, true);
  }

  toSetNewSearchFromPage(newSearchPage: ABaseSearchDTO, oldSearch: KomplSearchDTO | GruppaSearchDTO | ModelSearchDTO | OborudEkzSearchDTO){
    Object.keys(newSearchPage).forEach(key => {
      if (oldSearch.hasOwnProperty(key)) {
        oldSearch[key] = newSearchPage[key];
      }
    })
  }
}
