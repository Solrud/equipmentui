import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {
  DialogResult,
  FIELD_COLUMN_GRUPPA_LIST,
  FIELD_COLUMN_KOMPL_LIST,
  FIELD_COLUMN_MODEL_LIST,
  FIELD_COLUMN_OBORUD_EKZ_LIST,
  OriginSourceTable,
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
import {ABaseSearchDTO} from "../../../../data/model/search/ABaseSearchDTO";
import {ToastService} from "../../../../data/service/OptionalService/toast.service";
import {KomplDTO} from "../../../../data/model/dto/impl/KomplDTO";
import {GruppaDTO} from "../../../../data/model/dto/impl/GruppaDTO";
import {ModelDTO} from "../../../../data/model/dto/impl/ModelDTO";
import {OborudEkzDTO} from "../../../../data/model/dto/impl/OborudEkzDTO";

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
  originSourceTable: OriginSourceTable = OriginSourceTable.MAIN_TABLE; // Содержит инфу в каком месте открыта таблица

  mainSelectedElement: any;

  //Поисковые обьекты
  dataSearch: ABaseSearchDTO; //Один поисковой обьект, который идет в компонент таблицы
  komplSearch: KomplSearchDTO;
  gruppaSearch: GruppaSearchDTO;
  modelSearch: ModelSearchDTO;
  oborudEkzSearch: OborudEkzSearchDTO;

  //Комплекс связей
  komplRelationshipSelectedElement: KomplDTO;
  komplRelationshipDataInput: KomplDTO[] = [];
  komplRelationshipFieldColumnList: string[] = FIELD_COLUMN_KOMPL_LIST;

  //Группа связей
  gruppaRelationshipSelectedElement: GruppaDTO;
  gruppaRelationshipDataInput: GruppaDTO[] = [];
  gruppaRelationshipFieldColumnList: string[] = FIELD_COLUMN_GRUPPA_LIST;

  //Модель связей
  modelRelationshipSelectedElement: ModelDTO;
  modelRelationshipDataInput: ModelDTO[] = [];
  modelRelationshipFieldColumnList: string[] = FIELD_COLUMN_MODEL_LIST;

  //Экземпляр связей
  oborudEkzRelationshipSelectedElement: OborudEkzDTO;
  oborudEkzRelationshipDataInput: OborudEkzDTO[] = [];
  oborudEkzRelationshipFieldColumnList: string[] = FIELD_COLUMN_OBORUD_EKZ_LIST;


  @ViewChild(MatDrawer)
  private readonly drawerComponent?: MatDrawer;

  constructor(private eventService: EventService,
              private openDialogService: OpenDialogService,
              private komplService: KomplService,
              private gruppaService: GruppaService,
              private modelService: ModelService,
              private oborudEkzService: OborudEkzService,
              private toastService: ToastService
              ) {
  }

  ngOnInit(): void {
    this.initSearchData();
    this._subscribeToSelectedSpravochnik();

    this._subscribeToMainSelectedElement();
    this._subscribeToKomplRelationshipSelectedElement();
    this._subscribeToGruppaRelationshipSelectedElement();
    this._subscribeToModelRelationshipSelectedElement();
    this._subscribeToOborudEkzRelationshipSelectedElement();
  }

  //ToDo =>
  // при создании экземпляра сделать привязку к модели !!!
  // таблица добавления сязей с чекбоксами
  // main HTML исправить,чтобы высота выставлялась автоматически от разрешения
  // DTO<any> переделать придумать
  // как отображать доп таблички(какие данные нужны, как отображать их бордеры, до доп кнопки взаимодействия)
  // при выборе записи выводить дочерние привязанные таблицы(не знаю как)
  // код классификатора изменился old(вид, группа, пу, габариты) СЕЙЧАС (классификатор(класс оборудрвания), вид, ПУ, габариты), то есь вместо вида-классификатор и вместо группа-вид
  // -
  // =>-ОПЦИОНАЛЬНО-<=
  // проставить toast's о создании, редактировани, ошибке
  // опционально добавить кнопочку новостей разработки со всплывающей модалкой. не.. запара
  // перевод mat-paginator, взять из https://gitlab.avid.ru/mikishev/bienieui/blob/develop/1.0.1-secure/src/app/busines/intl/MyMatPaginatorIntl.ts и i18n оттуда
  // в конце концов не забыть про i18n!
  // -
  // =>-ПОЧЕМУ ОШИБКА-<=
  // -
  // =>-ВОПРОС-<=
  // что делать с кодом то у основных справочников? автоматически формируется
  // как серчить все через /search тк нужна сортировка. pageSize в 0 как я понял.
  //  B F NOborudDTO, KomplDtoDeserializer ? (Bazis, File, Navigator, KomplDesa..это не надо в итге не нужно это даже трогать)
  // спросить про экз оборуд в переход на модели (1 экз на 1 модель?). ДА СВЯЗЬ 1 К 1 экз к модели
  // ! Неактивные показывать но с зачеркиванием, выделением другого цвета
  // ! СПРОСИТЬ: при инициализации(первом открытии сайта) нужно ли выбирать 1 из списка по умолчанию выбранным. НЕ НАДО
  // ! СПРОСИТЬ: нужно ли выводить всем списком строки таблиц, если да, то нужно принимать урезанные данные. БУДЕТ п поумолчанию столько строк, сколько входит и "Все"
  // ? СПРОСИТЬ: Какие поля нужны в редактировании сущностей(тз и базис димы отличается)
  // нужны айдишники в табличках?
  // на какие поля в модалках ставить валидаторы?
  // КОД ИЛИ КЛАСС??
  // -
  // => ЖДУ от димы
  // примечание в экземплярах оборудования

  public get TableType() {
    return TableType;
  }
  public get OriginSourceTable() {
    return OriginSourceTable;
  }

  initSearchData(){
    if(!this.komplSearch) this.komplSearch = new KomplSearchDTO();
    if(!this.gruppaSearch) this.gruppaSearch = new GruppaSearchDTO();
    if(!this.modelSearch) this.modelSearch = new ModelSearchDTO();
    if(!this.oborudEkzSearch) this.oborudEkzSearch = new OborudEkzSearchDTO();
  }

  toClearAllRelationshipDataInput(): void{
    this.komplRelationshipDataInput = [];
    this.gruppaRelationshipDataInput = [];
    this.modelRelationshipDataInput = [];
    this.oborudEkzRelationshipDataInput = [];
  }
  toClearAllRelationshipSelectedElement(): void {
    this.eventService.selectElementKomplRelationshipTable$(null);
    this.eventService.selectElementGruppaRelationshipTable$(null);
    this.eventService.selectElementModelRelationshipTable$(null);
    this.eventService.selectElementOborudEkzRelationshipTable$(null);
  }

  _subscribeToMainSelectedElement(){
    this.eventService.selectedElementMainTable$.subscribe( (result: any) => {
      this.mainSelectedElement = result;
      this.toClearAllRelationshipDataInput();
      if (result){
        if (this.selectedSpravochnik === TableType.KOMPL){
          if (result?.oborudovanie && result?.oborudovanie.length > 0){
            for(let i = 0; i < result.oborudovanie.length; i++){
              if(result.oborudovanie[i].tip == '2'){ // Если Группа
                this.gruppaRelationshipDataInput.push(result.oborudovanie[i]);
              }
              if(result.oborudovanie[i].tip == '1'){ // Если модель
                this.modelRelationshipDataInput.push(result.oborudovanie[i]);
              }
            }
          }
        }
        if (this.selectedSpravochnik === TableType.GRUPPA){
          this.komplService.findByGruppaId(result?.id).subscribe( resultKompl => {
            this.komplRelationshipDataInput = resultKompl;
          })
          if(result?.modely && result?.modely.length > 0){
            for(let i = 0; i < result.modely.length; i++){
              this.modelRelationshipDataInput.push(result.modely[i]);
            }
          }
        }
        if (this.selectedSpravochnik === TableType.MODEL){
          this.komplService.findByModelId(result.id).subscribe( resultKompl => {
            this.komplRelationshipDataInput = resultKompl;
          })

          this.gruppaService.findByModelId(result.id).subscribe( resultGruppa => {
            this.gruppaRelationshipDataInput = resultGruppa;
          })

          if (result?.ekzemplary && result?.ekzemplary.length > 0){
            for(let i = 0; i < result.ekzemplary.length; i++){
              this.oborudEkzRelationshipDataInput.push(result.ekzemplary[i]);
            }
          }
        }
      }
    })
  }
  _subscribeToKomplRelationshipSelectedElement(){
    this.eventService.selectedElementKomplRelationshipTable$.subscribe( (result: KomplDTO) => {
      this.komplRelationshipSelectedElement = result;
    })
  }
  _subscribeToGruppaRelationshipSelectedElement(){
    this.eventService.selectedElementGruppaRelationshipTable$.subscribe( (result: GruppaDTO) => {
      this.gruppaRelationshipSelectedElement = result;
    })
  }
  _subscribeToModelRelationshipSelectedElement(){
    this.eventService.selectedElementModelRelationshipTable$.subscribe( (result: ModelDTO) => {
      this.modelRelationshipSelectedElement = result;
    })
  }
  _subscribeToOborudEkzRelationshipSelectedElement(){
    this.eventService.selectedElementOborudEkzRelationshipTable$.subscribe( (result: OborudEkzDTO) => {
      this.oborudEkzRelationshipSelectedElement = result;
    })
  }

  _subscribeToSelectedSpravochnik(){
    this.eventService.selectedSpravTable$.subscribe((result: TableType) => {
      this.selectedSpravochnik = result;
      this.eventService.selectElementMainTable$(null);                  // мб в отдельный вынести
      this.eventService.selectElementKomplRelationshipTable$(null);
      this.eventService.selectElementGruppaRelationshipTable$(null);
      this.eventService.selectElementModelRelationshipTable$(null);
      this.eventService.selectElementOborudEkzRelationshipTable$(null);

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

  // Методы Связных таблиц
  onClickOpenKomplRelationshipDialog(){

  }

  onClickOpenGruppaRelationshipDialog(originSpravochnik: TableType){
    if ((this.selectedSpravochnik === TableType.KOMPL) && this.mainSelectedElement){
      this.openDialogService.openGruppaRelationshipDialog
      (originSpravochnik, this.mainSelectedElement, this.gruppaRelationshipDataInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.onReSearchPage();
        }
      });
    }
    // if ((this.selectedSpravochnik === TableType.MODEL) && this.mainSelectedElement){
    //   this.openDialogService.openGruppaRelationshipDialog
    //   (originSpravochnik, this.mainSelectedElement, this.gruppaRelationshipDataInput).closed.subscribe( result => {
    //     if (result === DialogResult.ACCEPT){
    //       this.onReSearchPage();
    //     }
    //   });
    // }
  }

  onClickOpenModelRelationshipDialog(originSpravochnik: TableType){
    if ((this.selectedSpravochnik === TableType.KOMPL) && this.mainSelectedElement){
      this.openDialogService.openModelRelationshipDialog
      (originSpravochnik, this.mainSelectedElement, this.modelRelationshipDataInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.onReSearchPage();
        }
      });
    }
    if ((this.selectedSpravochnik === TableType.GRUPPA) && this.mainSelectedElement){
      this.openDialogService.openModelRelationshipDialog
      (originSpravochnik, this.mainSelectedElement, this.modelRelationshipDataInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.onReSearchPage();
        }
      });
    }
  }

  onClickOpenOborudEkzRelationshipDialog(){

  }


  // Методы Вкладки
  onClickNavKompl(newDataSearch: ABaseSearchDTO = null, reSearchPage: boolean = false): void{
    this.drawerComponent?.open();
    if ((this.selectedSpravochnik != TableType.KOMPL || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.KOMPL) : this.isFirstTimeInitNav = false;

      if(newDataSearch && reSearchPage)
        this.toSetNewSearchFromPage(newDataSearch, this.komplSearch);

      this.dataSearch = this.komplSearch;
      this.dataTableNavSource = [];
      this.komplService.searchPage(this.komplSearch).subscribe(result => {
        if (result && result.content.length > 0){
          this.totalFoundedElements = result.totalElements;
          this.dataTableNavSource = result.content;

          this.fieldColumnList = FIELD_COLUMN_KOMPL_LIST;
          this.temporarilyDisabledNavBar = false;
        }
      }, error => {
        this.toastService.showNegativeFixed('Не удалось загрузить таблицу Комплекс');
      })
    }
  }

  onClickNavGruppa(newDataSearch: ABaseSearchDTO = null, reSearchPage: boolean = false): void{
    this.drawerComponent?.open();
    if ((this.selectedSpravochnik != TableType.GRUPPA || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.GRUPPA) : this.isFirstTimeInitNav = false;
      if(newDataSearch && reSearchPage)
        this.toSetNewSearchFromPage(newDataSearch, this.gruppaSearch);

      this.dataSearch = this.gruppaSearch;
      this.dataTableNavSource = [];
      this.gruppaService.searchPage(this.gruppaSearch).subscribe(result => {
        if (result && result.content.length > 0){
          this.totalFoundedElements = result.totalElements;
          this.dataTableNavSource = result.content;
          this.fieldColumnList = FIELD_COLUMN_GRUPPA_LIST;
          this.temporarilyDisabledNavBar = false;
        }
      }, error => {
        this.toastService.showNegativeFixed('Не удалось загрузить таблицу Группа');
      })
    }
  }

  onClickNavModel(newDataSearch: ABaseSearchDTO = null, reSearchPage: boolean = false): void{
    this.drawerComponent?.open();
    if ((this.selectedSpravochnik != TableType.MODEL || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.MODEL) : this.isFirstTimeInitNav = false;

      if(newDataSearch && reSearchPage)
        this.toSetNewSearchFromPage(newDataSearch, this.modelSearch);

      this.dataSearch = this.modelSearch;
      this.dataTableNavSource = [];
      this.modelService.searchPage(this.modelSearch).subscribe(result => {
        if (result && result.content.length > 0){
          this.totalFoundedElements = result.totalElements;
          this.dataTableNavSource = result.content;
          this.fieldColumnList = FIELD_COLUMN_MODEL_LIST;
          this.temporarilyDisabledNavBar = false;
        }
      }, error => {
        this.toastService.showNegativeFixed('Не удалось загрузить таблицу Модели');
      })
    }
  }

  onClickNavOborudEkz(newDataSearch: ABaseSearchDTO = null, reSearchPage: boolean = false): void{
    this.drawerComponent?.close();
    if ((this.selectedSpravochnik != TableType.OBORUD_EKZ || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.OBORUD_EKZ) : this.isFirstTimeInitNav = false;

      if(newDataSearch && reSearchPage)
        this.toSetNewSearchFromPage(newDataSearch, this.oborudEkzSearch);

      this.dataSearch = this.oborudEkzSearch;
      this.dataTableNavSource = [];
      this.oborudEkzService.searchPage(this.oborudEkzSearch).subscribe(result => {
        if (result && result.content.length > 0){
          this.totalFoundedElements = result.totalElements;
          this.dataTableNavSource = result.content;

          this.fieldColumnList = FIELD_COLUMN_OBORUD_EKZ_LIST;
          this.temporarilyDisabledNavBar = false;
        }
      }, error => {
        this.toastService.showNegativeFixed('Не удалось загрузить таблицу Экземпляры');
      })
    }
  }

  onChangePage(newDataSearch: ABaseSearchDTO): void{ //output изменения пагинации таблицы
    this.initNavBar(this.selectedSpravochnik, newDataSearch, true);
  }

  onReSearchPage(){
    this.initNavBar(this.selectedSpravochnik, null, true);
  }

  // присваивает к существующему search object пагинаторные свойства
  toSetNewSearchFromPage(newSearchPage: ABaseSearchDTO, oldSearch: KomplSearchDTO | GruppaSearchDTO | ModelSearchDTO | OborudEkzSearchDTO){
    Object.keys(newSearchPage).forEach(key => {
      if (oldSearch.hasOwnProperty(key)) {
        oldSearch[key] = newSearchPage[key];
      }
    })
  }
}
