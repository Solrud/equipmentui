import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {
  DELAY_TIME_CLOSE_FOR_TOOLTIP,
  DELAY_TIME_OPEN_FOR_TOOLTIP,
  DialogMode,
  DialogResult,
  FIELD_COLUMN_GRUPPA_LIST,
  FIELD_COLUMN_KOMPL_LIST,
  FIELD_COLUMN_MODEL_LIST,
  FIELD_COLUMN_OBORUD_EKZ_LIST,
  OriginSourceTable,
  TableType,
  UserRoleAuth
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

  mainSelectedElement: any = null;
  mainService: any;

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

  currentRole: UserRoleAuth; // какая сейчас роль у юзверя

  @ViewChild(MatDrawer)
  private readonly drawerComponent?: MatDrawer;

  constructor(private eventService: EventService,
              private openDialogService: OpenDialogService,
              private komplService: KomplService,
              private gruppaService: GruppaService,
              private modelService: ModelService,
              private oborudEkzService: OborudEkzService,
              private toastService: ToastService
              ) {}

  ngOnInit(): void {
    this.initSearchData();
    this._subscribeToSelectedSpravochnik();

    this._subscribeToMainSelectedElement();
    this._subscribeToKomplRelationshipSelectedElement();
    this._subscribeToGruppaRelationshipSelectedElement();
    this._subscribeToModelRelationshipSelectedElement();
    this._subscribeToOborudEkzRelationshipSelectedElement();
    this._subscribeCurrentRole();
  }

  //ToDo =>
  // 3.   ✅    По умолчанию отображать актуальные записи в таблице (установить фильтр «Действующие») для пользователей и администратора.
  // 7.   ✅    Фильтр Актуальность изменить на выпадающий список (Все записи, только действующие, только устаревшие).
  // 8.   ✅    Гость должен видеть только Актуальные записи во вкладках (изменить настройку не может).
  // 1.   ✅    Фильтрация по полям по умолчанию развернуть.
  // 2.   ✅    Исправить формулировку «Активность», «Сделать активным», «Сделать неактивным», «Неактивные» на «Действующие», «Сделать действующим», «Сделать устаревшим», «Устаревшие».
  // 4.   ✅    Не работает фильтрация по коду классификатора на вкладке «Группа». (вроде работала и рабоатет)
  // 5.   ✅    В настройках «Код и Вид оборудования» изменить на «Класс и Вид оборудования» и все соответствующие записи в окне.
  // 6.   ✅    При добавлении нового вида оборудования исправить в названии окна Код оборудования на Вид оборудования.
  // 9.   ✅    Скрыть кнопку Отчет (пока).
  // 10.  ✅    При выделении экземпляра при отсутствии связанной модели кнопку перехода делать неактивной.
  // DTO<any> переделать придумать
  // -
  // =>-ОПЦИОНАЛЬНО-<=
  // таблица связей при заполнении обоих проваливается вниз сайта, нужен правильный overflow
  // хэлп и о приложении, хэлп в ворд скачиваемый или пдф веб-просмотрщик(не скоро)
  // -
  // =>-ВОПРОС-<=
  // -
  // => ЖДУ от димы
  // нужно попросить диму исправить ошибку. если вызывать searchPage С ПАРАМЕТОМ "родитель"ID,
  //   (т.е. выдавать экземпляры привязанные к родителю) у вида или участков, то приходит просто список ВСЕХ запрашиваемых сущностей,
  //     это надо чтобы работала сортировка в таблице
  // подключение к рейльной бд на проде
  // код классификатора скоро не нужно будет формировать для создания группы
  // - может стоит перейти с каскадной модели ДТО в v.2
  // не удаляется в настройках справочник если в нем есть дети

  public get TableType() {
    return TableType;
  }
  public get OriginSourceTable() {
    return OriginSourceTable;
  }
  public get UserRole() {
    return UserRoleAuth;
  }
  public get DELAY_TIME_OPEN_FOR_TOOLTIP(){
    return DELAY_TIME_OPEN_FOR_TOOLTIP;
  }
  public get DELAY_TIME_CLOSE_FOR_TOOLTIP(){
    return DELAY_TIME_CLOSE_FOR_TOOLTIP;
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

  _subscribeCurrentRole(){
    this.eventService.selectedCurrentRole$.subscribe( result => {
      this.currentRole = result;
    })
  }

  _subscribeToMainSelectedElement(){
    this.eventService.selectedElementMainTable$.subscribe( (result: any) => {
      if (result && result?.id != this.mainSelectedElement?.id){
        this.toFindRelationshipDataByMainSelectedElement(result);
      }
      this.mainSelectedElement = result;
    })
  }

  toFindRelationshipDataByMainSelectedElement(mainElement: any){  //серчит привязанные к главному элементу списки связей
    this.toClearAllRelationshipDataInput();
    if (mainElement){
      if (this.selectedSpravochnik === TableType.KOMPL){
        this.gruppaService.findByKomplId(mainElement?.id).subscribe( resultGruppaList => {
          this.gruppaRelationshipDataInput = resultGruppaList;
        })

        this.modelService.findByKomplId(mainElement?.id).subscribe( resultModelList => {
          this.modelRelationshipDataInput = resultModelList;
        })
      }
      if (this.selectedSpravochnik === TableType.GRUPPA){

        this.komplService.findByGruppaId(mainElement?.id).subscribe( resultKompl => {
          this.komplRelationshipDataInput = resultKompl;
        })

        this.modelService.findByGruppaId(mainElement?.id).subscribe( resultModelList => {
          this.modelRelationshipDataInput = resultModelList;
        })
      }
      if (this.selectedSpravochnik === TableType.MODEL){
        this.komplService.findByModelId(mainElement.id).subscribe( resultKompl => {
          this.komplRelationshipDataInput = resultKompl;
        })

        this.gruppaService.findByModelId(mainElement.id).subscribe( resultGruppa => {
          this.gruppaRelationshipDataInput = resultGruppa;
        })

        this.oborudEkzService.findByModelId(mainElement.id).subscribe( resultOborudList => {
          this.oborudEkzRelationshipDataInput = resultOborudList;
        })
      }
    }
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
      this.eventService.selectElementKomplRelationshipTable$(null);
      this.eventService.selectElementGruppaRelationshipTable$(null);
      this.eventService.selectElementModelRelationshipTable$(null);
      this.eventService.selectElementOborudEkzRelationshipTable$(null);

      if (this.isFirstTimeInitNav) this.initNavBar(result);
    })
  }

  initNavBar(selectedNavBar: TableType, newDataSearch: ABaseSearchDTO = null,
             reSearchPage: boolean = false, toResearchRelation: boolean = false){
    switch (selectedNavBar){
      case  TableType.KOMPL:
        this.onClickNavKompl(newDataSearch, reSearchPage , toResearchRelation);
        this.mainService = this.komplService;
        break;
      case TableType.GRUPPA:
        this.onClickNavGruppa(newDataSearch, reSearchPage , toResearchRelation);
        this.mainService = this.gruppaService;
        break;
      case TableType.MODEL:
        this.onClickNavModel(newDataSearch, reSearchPage, toResearchRelation);
        this.mainService = this.modelService;
        break;
      case TableType.OBORUD_EKZ:
        this.onClickNavOborudEkz(newDataSearch, reSearchPage);
        this.mainService = this.oborudEkzService;
        break;
    }
  }

  toggleSidenavOpened(): void{
    this.drawerComponent?.toggle();
  }

  // Методы Связных таблиц
  onClickOpenKomplRelationshipDialog(originSpravochnik: TableType){
    if (((this.selectedSpravochnik === TableType.GRUPPA || this.selectedSpravochnik === TableType.MODEL)
      && this.mainSelectedElement) && this.currentRole != UserRoleAuth.VIEW){
      this.openDialogService.openKomplRelationshipDialog
      (originSpravochnik, this.mainSelectedElement, this.komplRelationshipDataInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.onReSearchPage(true);
        }
      })
    }
  }

  onClickOpenGruppaRelationshipDialog(originSpravochnik: TableType){
    if (((this.selectedSpravochnik === TableType.KOMPL || this.selectedSpravochnik === TableType.MODEL)
      && this.mainSelectedElement) && this.currentRole != UserRoleAuth.VIEW){
      this.openDialogService.openGruppaRelationshipDialog
      (originSpravochnik, this.mainSelectedElement, this.gruppaRelationshipDataInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.onReSearchPage(true);
        }
      });
    }
  }

  onClickOpenModelRelationshipDialog(originSpravochnik: TableType){
    if (((this.selectedSpravochnik === TableType.KOMPL || this.selectedSpravochnik === TableType.GRUPPA)
      && this.mainSelectedElement) && this.currentRole != UserRoleAuth.VIEW){
      this.openDialogService.openModelRelationshipDialog
      (originSpravochnik, this.mainSelectedElement, this.modelRelationshipDataInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.onReSearchPage(true);
        }
      });
    }
  }

  onClickOpenOborudEkzDialog(){
    if (this.mainSelectedElement && this.oborudEkzRelationshipSelectedElement && this.currentRole != UserRoleAuth.VIEW){
      this.openDialogService.openElementDialog(this.oborudEkzRelationshipSelectedElement,
        TableType.OBORUD_EKZ, DialogMode.EDIT).closed.subscribe( result => {
        if (result == DialogResult.ACCEPT)
          this.onReSearchPage(true);
      })
    }
  }

  // Методы Вкладки
  onClickNavKompl(newDataSearch: any = null, reSearchPage: boolean = false, toResearchRelation: boolean = false): void{
    if ((this.selectedSpravochnik != TableType.KOMPL || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.KOMPL) : this.isFirstTimeInitNav = false;
      if(reSearchPage){
        if(!newDataSearch && toResearchRelation) this.toFindRelationshipDataByMainSelectedElement(this.mainSelectedElement);
        if(newDataSearch){
          this.toSetNewSearchFromPage(newDataSearch, this.komplSearch);
          if (toResearchRelation) {
            this.komplSearch = newDataSearch;
            this.toFindRelationshipDataByMainSelectedElement(this.mainSelectedElement);
          }
        }
      } else {
        this.eventService.selectElementMainTable$(null);
        this.toClearAllRelationshipDataInput();
        this.toClearAllRelationshipSelectedElement();
      }

      this.komplSearch.akt = this.komplSearch.akt !== undefined ? this.komplSearch.akt : 1;
      this.dataSearch = this.komplSearch;
      this.dataTableNavSource = [];
      this.komplService.searchPage(this.komplSearch).subscribe(result => {
        if (result){
          this.totalFoundedElements = result.totalElements;
          this.dataTableNavSource = result.content;

          this.fieldColumnList = FIELD_COLUMN_KOMPL_LIST;
          this.temporarilyDisabledNavBar = false;
          this.drawerComponent?.open();
        }
      }, error => {
        this.openDialogService.openInformationDialog('Ошибка!', error);
        this.toastService.showNegativeFixed('Не удалось загрузить таблицу Комплекс');
      })
    }
  }

  onClickNavGruppa(newDataSearch: any = null, reSearchPage: boolean = false, toResearchRelation: boolean = false): void{
    if ((this.selectedSpravochnik != TableType.GRUPPA || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.GRUPPA) : this.isFirstTimeInitNav = false;

      if(reSearchPage){
        if(!newDataSearch && toResearchRelation) this.toFindRelationshipDataByMainSelectedElement(this.mainSelectedElement);
        if(newDataSearch){
          this.toSetNewSearchFromPage(newDataSearch, this.gruppaSearch);
          if (toResearchRelation) {
            this.gruppaSearch = newDataSearch;
            this.toFindRelationshipDataByMainSelectedElement(this.mainSelectedElement);
          }
        }
      } else {
        this.eventService.selectElementMainTable$(null);
        this.toClearAllRelationshipDataInput();
        this.toClearAllRelationshipSelectedElement();
      }

      this.gruppaSearch.akt = this.gruppaSearch.akt !== undefined ? this.gruppaSearch.akt : 1;
      this.dataSearch = this.gruppaSearch;
      this.dataTableNavSource = [];
      this.gruppaService.searchPage(this.gruppaSearch).subscribe(result => {
        if (result){
          this.totalFoundedElements = result.totalElements;
          this.dataTableNavSource = result.content;
          this.fieldColumnList = FIELD_COLUMN_GRUPPA_LIST;
          this.temporarilyDisabledNavBar = false;
          this.drawerComponent?.open();
        }
      }, error => {
        this.openDialogService.openInformationDialog('Ошибка!', error);
        this.toastService.showNegativeFixed('Не удалось загрузить таблицу Группа');
      })
    }
  }

  onClickNavModel(newDataSearch: any = null, reSearchPage: boolean = false, toResearchRelation: boolean = false): void{
    if ((this.selectedSpravochnik != TableType.MODEL || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;

      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.MODEL) : this.isFirstTimeInitNav = false;

      if(reSearchPage){
        if (!newDataSearch && toResearchRelation) this.toFindRelationshipDataByMainSelectedElement(this.mainSelectedElement);
        if(newDataSearch){
          this.toSetNewSearchFromPage(newDataSearch, this.modelSearch);
          if (toResearchRelation) {
            this.modelSearch = newDataSearch;
            this.toFindRelationshipDataByMainSelectedElement(this.mainSelectedElement);
          }
        }
      } else {
        this.eventService.selectElementMainTable$(null);
        this.toClearAllRelationshipDataInput();
        this.toClearAllRelationshipSelectedElement();
      }

      this.modelSearch.akt = this.modelSearch.akt !== undefined ? this.modelSearch.akt : 1;
      this.dataSearch = this.modelSearch;
      this.dataTableNavSource = [];
      this.modelService.searchPage(this.modelSearch).subscribe(result => {
        if (result){
          this.totalFoundedElements = result.totalElements;
          this.dataTableNavSource = result.content;
          this.fieldColumnList = FIELD_COLUMN_MODEL_LIST;
          this.temporarilyDisabledNavBar = false;
          this.drawerComponent?.open();
        }
      }, error => {
        this.openDialogService.openInformationDialog('Ошибка ' + error?.name + "!",  error?.message);
        this.toastService.showNegativeFixed('Не удалось загрузить таблицу Модели');
      })
    }
  }

  onClickNavOborudEkz(newDataSearch: ABaseSearchDTO = null, reSearchPage: boolean = false): void{
    this.drawerComponent?.close();
    if ((this.selectedSpravochnik != TableType.OBORUD_EKZ || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;

      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.OBORUD_EKZ) : this.isFirstTimeInitNav = false;

      if(reSearchPage){
        if(newDataSearch){
          this.toSetNewSearchFromPage(newDataSearch, this.oborudEkzSearch);
        }
      } else {
        this.eventService.selectElementMainTable$(null);
        this.toClearAllRelationshipDataInput();
        this.toClearAllRelationshipSelectedElement();
      }

      this.oborudEkzSearch.akt = this.oborudEkzSearch.akt !== undefined ? this.oborudEkzSearch.akt : 1;
      this.dataSearch = this.oborudEkzSearch;
      this.dataTableNavSource = [];
      this.oborudEkzService.searchPage(this.oborudEkzSearch).subscribe(result => {
        if (result){
          this.totalFoundedElements = result.totalElements;
          this.dataTableNavSource = result.content;

          this.fieldColumnList = FIELD_COLUMN_OBORUD_EKZ_LIST;
          this.temporarilyDisabledNavBar = false;
        }
      }, error => {
        this.openDialogService.openInformationDialog('Ошибка!', error);
        this.toastService.showNegativeFixed('Не удалось загрузить таблицу Экземпляры');
      })
    }
  }

  onClickGoToRelativeKomplElement(){
    if (this.komplRelationshipSelectedElement){
      let newDataSearchRelative = new KomplSearchDTO();
      newDataSearchRelative.kod = this.komplRelationshipSelectedElement.kod;
      newDataSearchRelative.naim = this.komplRelationshipSelectedElement.naim;
      newDataSearchRelative.akt = this.komplRelationshipSelectedElement.akt;
      this.mainSelectedElement = this.komplRelationshipSelectedElement;
      this.eventService.selectElementMainTable$(this.mainSelectedElement);
      this.onChangePage(newDataSearchRelative, TableType.KOMPL, true);

      this.toastService.showPrimary('Выполнен переход к связанному элементу в КОМПЛЕКС');
    }
  }

  onClickGoToRelativeGruppaElement(){
    if (this.gruppaRelationshipSelectedElement){
      let newDataSearchRelative = new GruppaSearchDTO();
      newDataSearchRelative.kod = this.gruppaRelationshipSelectedElement.kod;
      newDataSearchRelative.naim = this.gruppaRelationshipSelectedElement.naim;
      newDataSearchRelative.kodKlass = this.gruppaRelationshipSelectedElement.kodKlass;
      newDataSearchRelative.akt = this.gruppaRelationshipSelectedElement.akt;
      this.mainSelectedElement = this.gruppaRelationshipSelectedElement;
      this.eventService.selectElementMainTable$(this.mainSelectedElement);
      this.onChangePage(newDataSearchRelative, TableType.GRUPPA, true);

      this.toastService.showPrimary('Выполнен переход к связанному элементу в ГРУППУ');
    }
  }

  onClickGoToRelativeModelElement(model: ModelDTO = this.modelRelationshipSelectedElement){
    if (model){
      let newDataSearchRelative = new ModelSearchDTO();
      newDataSearchRelative.kod = model.kod;
      newDataSearchRelative.obozn = model.obozn;
      newDataSearchRelative.naim = model.naim;
      newDataSearchRelative.akt = model.akt;
      this.mainSelectedElement = model;
      this.eventService.selectElementMainTable$(this.mainSelectedElement);
      this.onChangePage(newDataSearchRelative, TableType.MODEL, true);

      this.toastService.showPrimary('Выполнен переход к связанному элементу в МОДЕЛЬ');
    }
  }

  onChangePage(newDataSearch: ABaseSearchDTO, selectedSpravochnik: TableType = this.selectedSpravochnik,
               toResearchRelation: boolean = false): void{ //output изменения пагинации таблицы
    this.initNavBar(selectedSpravochnik, newDataSearch, true, toResearchRelation);
  }

  onReSearchPage(toResearchRelationshipTable: boolean = false){
    if (this.mainSelectedElement){
      this.mainService.read(this.mainSelectedElement.id).subscribe( result => {
        if (result){
          this.mainSelectedElement = result;
          this.eventService.selectElementMainTable$(this.mainSelectedElement);
        }
      })
    }
    this.initNavBar(this.selectedSpravochnik, null, true, toResearchRelationshipTable);
  }

  onReSearchAndMainSelectToNull(){
    this.mainSelectedElement = null;
    this.initNavBar(this.selectedSpravochnik, null, true, true);
  }

  onOpenElementForView(chosenElement: any){
    this.openDialogService.openElementDialog(chosenElement, this.selectedSpravochnik, DialogMode.VIEW);
  }

  // присваивает к существующему search object пагинаторные свойства
  toSetNewSearchFromPage(newSearchPage: ABaseSearchDTO, oldSearch: KomplSearchDTO | GruppaSearchDTO | ModelSearchDTO | OborudEkzSearchDTO){
    Object.keys(newSearchPage).forEach(key => {
      if (newSearchPage[key] != oldSearch[key] ) {
        oldSearch[key] = newSearchPage[key];
      }
    })
  }
}
