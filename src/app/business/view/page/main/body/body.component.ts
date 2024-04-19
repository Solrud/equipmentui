import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {
  DialogMode,
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
  }

  //ToDo =>
  // реализация перехода на связанный элемент: происходт переход на сущность главной таблицы, в тейбл передается выбранный элемент, в связях отображать эти связи с элементом.
  // реализовать аутентификацию
  // DTO<any> переделать придумать
  // -
  // =>-ОПЦИОНАЛЬНО-<=
  // звездочки у лейблов требуемых контролов проставить
  // проставить toast's о создании, редактировани, ошибке
  // опционально добавить кнопочку новостей разработки со всплывающей модалкой. не.. запара
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
  // код классификатора (классификатор(класс оборудрвания), вид, ПУ, габариты)
  // ! СПРОСИТЬ: при инициализации(первом открытии сайта) нужно ли выбирать 1 из списка по умолчанию выбранным. НЕ НАДО
  // ! СПРОСИТЬ: нужно ли выводить всем списком строки таблиц, если да, то нужно принимать урезанные данные. БУДЕТ п поумолчанию столько строк, сколько входит и "Все"
  // ? СПРОСИТЬ: Какие поля нужны в редактировании сущностей(тз и базис димы отличается)
  // нужны айдишники в табличках?
  // на какие поля в модалках ставить валидаторы?
  // КОД ИЛИ КЛАСС??
  // -
  // => ЖДУ от димы
  // подключение к рейльной бд на проде
  // код классификатора скоро не нужно будет формировать для создания группы
  // - может стоит перейти с каскадной модели ДТО в v.2

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
      // console.log(this.mainSelectedElement)
      this.selectedSpravochnik = result;
      this.eventService.selectElementKomplRelationshipTable$(null);
      this.eventService.selectElementGruppaRelationshipTable$(null);
      this.eventService.selectElementModelRelationshipTable$(null);
      this.eventService.selectElementOborudEkzRelationshipTable$(null);

      if (this.isFirstTimeInitNav) this.initNavBar(result);
    })
  }

  initNavBar(selectedNavBar: TableType, newDataSearch: ABaseSearchDTO = null, reSearchPage: boolean = false, toResearchRelation: boolean = false){
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
    if ((this.selectedSpravochnik === TableType.GRUPPA || this.selectedSpravochnik === TableType.MODEL) && this.mainSelectedElement){
      this.openDialogService.openKomplRelationshipDialog
      (originSpravochnik, this.mainSelectedElement, this.komplRelationshipDataInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.onReSearchPage(true);
        }
      })
    }
  }

  onClickOpenGruppaRelationshipDialog(originSpravochnik: TableType){
    if ((this.selectedSpravochnik === TableType.KOMPL || this.selectedSpravochnik === TableType.MODEL) && this.mainSelectedElement){
      this.openDialogService.openGruppaRelationshipDialog
      (originSpravochnik, this.mainSelectedElement, this.gruppaRelationshipDataInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.onReSearchPage(true);
        }
      });
    }
  }

  onClickOpenModelRelationshipDialog(originSpravochnik: TableType){
    if ((this.selectedSpravochnik === TableType.KOMPL || this.selectedSpravochnik === TableType.GRUPPA) && this.mainSelectedElement){
      this.openDialogService.openModelRelationshipDialog
      (originSpravochnik, this.mainSelectedElement, this.modelRelationshipDataInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.onReSearchPage(true);
        }
      });
    }
  }

  onClickOpenOborudEkzDialog(){
    if (this.mainSelectedElement && this.oborudEkzRelationshipSelectedElement){
      this.openDialogService.openElementDialog(this.oborudEkzRelationshipSelectedElement, TableType.OBORUD_EKZ, DialogMode.EDIT).closed.subscribe( result => {
        if (result == DialogResult.ACCEPT)
          this.onReSearchPage(true);
      })
    }
  }

  // Методы Вкладки
  onClickNavKompl(newDataSearch: ABaseSearchDTO = null, reSearchPage: boolean = false, toResearchRelation: boolean = false): void{
    if ((this.selectedSpravochnik != TableType.KOMPL || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.KOMPL) : this.isFirstTimeInitNav = false;
      if(reSearchPage){
        if(!newDataSearch && toResearchRelation) this.toFindRelationshipDataByMainSelectedElement(this.mainSelectedElement);
        if(newDataSearch){
          this.toSetNewSearchFromPage(newDataSearch, this.komplSearch);
        }
      } else {
        this.eventService.selectElementMainTable$(null);
        this.toClearAllRelationshipDataInput();
        this.toClearAllRelationshipSelectedElement();
      }

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
        this.toastService.showNegativeFixed('Не удалось загрузить таблицу Комплекс');
      })
    }
  }

  onClickNavGruppa(newDataSearch: ABaseSearchDTO = null, reSearchPage: boolean = false, toResearchRelation: boolean = false): void{
    if ((this.selectedSpravochnik != TableType.GRUPPA || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.GRUPPA) : this.isFirstTimeInitNav = false;

      if(reSearchPage){
        if(!newDataSearch && toResearchRelation) this.toFindRelationshipDataByMainSelectedElement(this.mainSelectedElement);
        if(newDataSearch){
          this.toSetNewSearchFromPage(newDataSearch, this.gruppaSearch);
        }
      } else {
        this.eventService.selectElementMainTable$(null);
        this.toClearAllRelationshipDataInput();
        this.toClearAllRelationshipSelectedElement();
      }

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
        this.toastService.showNegativeFixed('Не удалось загрузить таблицу Группа');
      })
    }
  }

  onClickNavModel(newDataSearch: ABaseSearchDTO = null, reSearchPage: boolean = false, toResearchRelation: boolean = false): void{
    if ((this.selectedSpravochnik != TableType.MODEL || this.isFirstTimeInitNav || reSearchPage) && !this.temporarilyDisabledNavBar){
      this.temporarilyDisabledNavBar = true;
      !this.isFirstTimeInitNav ? this.eventService.selectSpravTab$(TableType.MODEL) : this.isFirstTimeInitNav = false;
      if(reSearchPage){
        // this.eventServ ice.selectElementMainTable$(this.mainSelectedElement);
        if (!newDataSearch && toResearchRelation) this.toFindRelationshipDataByMainSelectedElement(this.mainSelectedElement);
        if(newDataSearch){
          this.toSetNewSearchFromPage(newDataSearch, this.modelSearch);
        }
      } else {
        this.eventService.selectElementMainTable$(null);
        this.toClearAllRelationshipDataInput();
        this.toClearAllRelationshipSelectedElement();
      }

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
        this.toastService.showNegativeFixed('Не удалось загрузить таблицу Экземпляры');
      })
    }
  }

  onChangePage(newDataSearch: ABaseSearchDTO): void{ //output изменения пагинации таблицы
    this.initNavBar(this.selectedSpravochnik, newDataSearch, true);
  }

  onReSearchPage(toResearchRelationshipTable: boolean = false){
    console.log('onReSearchPage')
    if (this.mainSelectedElement){
      console.log('this.mainSelectedElement')
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
      if (oldSearch.hasOwnProperty(key)) {
        oldSearch[key] = newSearchPage[key];
      }
    })
  }
}
