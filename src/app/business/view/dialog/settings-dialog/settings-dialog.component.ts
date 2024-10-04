import {Component, OnInit} from '@angular/core';
import {
  ActionMode,
  DialogMode,
  DialogResult,
  FIELD_COLUMN_GAB_ZO_LIST,
  FIELD_COLUMN_NAL_PU_LIST,
  FIELD_COLUMN_OBORUD_KLASS_LIST,
  FIELD_COLUMN_OBORUD_VID_LIST,
  FIELD_COLUMN_PODR_LIST,
  FIELD_COLUMN_PROIZV_LIST,
  FIELD_COLUMN_UCH_LIST,
  OriginSourceTable,
  TableType, UserRoleAuth
} from "../../../../app.constant";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OborudKlassSearchDTO} from "../../../data/model/search/impl/OborudKlassSearchDTO";
import {OborudKlassService} from "../../../data/service/implements/oborud-klass.service";
import {OborudKlassDTO} from "../../../data/model/dto/impl/OborudKlassDTO";
import {OborudVidSearchDTO} from "../../../data/model/search/impl/OborudVidSearchDTO";
import {OborudVidDTO} from "../../../data/model/dto/impl/OborudVid";
import {OborudVidService} from "../../../data/service/implements/oborud-vid.service";
import {NalPuService} from "../../../data/service/implements/nal-pu.service";
import {GabZoService} from "../../../data/service/implements/gab-zo.service";
import {ProizvService} from "../../../data/service/implements/proizv.service";
import {PodrService} from "../../../data/service/implements/podr.service";
import {UchService} from "../../../data/service/implements/uch.service";
import {NalPuSearchDTO} from "../../../data/model/search/impl/NalPuSearchDTO";
import {NalPuDTO} from "../../../data/model/dto/impl/NalPuDTO";
import {GabZoSearchDTO} from "../../../data/model/search/impl/GabZoSearchDTO";
import {GabZoDTO} from "../../../data/model/dto/impl/GabZoDTO";
import {ProizvSearchDTO} from "../../../data/model/search/impl/ProizvSearchDTO";
import {ProizvDTO} from "../../../data/model/dto/impl/ProizvDTO";
import {PodrSearchDTO} from "../../../data/model/search/impl/PodrSearchDTO";
import {PodrDTO} from "../../../data/model/dto/impl/PodrDTO";
import {UchSearchDTO} from "../../../data/model/search/impl/UchSearchDTO";
import {UchDTO} from "../../../data/model/dto/impl/UchDTO";
import {EventService} from "../../../data/service/OptionalService/event.service";
import {OpenDialogService} from "../../../data/service/OptionalService/open-dialog.service";
import {ToastService} from "../../../data/service/OptionalService/toast.service";
import {ABaseSearchDTO} from "../../../data/model/search/ABaseSearchDTO";
import {KomplSearchDTO} from "../../../data/model/search/impl/KomplSearchDTO";
import {GruppaSearchDTO} from "../../../data/model/search/impl/GruppaSearchDTO";
import {ModelSearchDTO} from "../../../data/model/search/impl/ModelSearchDTO";
import {OborudEkzSearchDTO} from "../../../data/model/search/impl/OborudEkzSearchDTO";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit{
  // Класс(Код) Оборудования
  klassSelectedElement: any = null;

  klassSearch: OborudKlassSearchDTO = new OborudKlassSearchDTO();
  klassDataTableInput: OborudKlassDTO[] = [];
  klassTotalFoundedElements: number = 0;
  klassFieldColumnList: string[] = FIELD_COLUMN_OBORUD_KLASS_LIST;

  // Вид оборудования
  vidSelectedElement: any = null;

  vidSearch: OborudVidSearchDTO = new OborudVidSearchDTO();
  vidDataTableInput: OborudVidDTO[] = [];
  vidTotalFoundedElements: number = 0;
  vidFieldColumnList: string[] = FIELD_COLUMN_OBORUD_VID_LIST;

  // Наличие ПУ
  nalPuSelectedElement: any = null;

  nalPuSearch: NalPuSearchDTO = new NalPuSearchDTO();
  nalPuDataTableInput: NalPuDTO[] = [];
  nalPuTotalFoundedElements: number = 0;
  nalPuFieldColumnList: string[] = FIELD_COLUMN_NAL_PU_LIST;

  // Габариты Зоны Обработки
  gabZoSelectedElement: any = null;

  gabZoSearch: GabZoSearchDTO = new GabZoSearchDTO();
  gabZoDataTableInput: GabZoDTO[] = [];
  gabZoTotalFoundedElements: number = 0;
  gabZoFieldColumnList: string[] = FIELD_COLUMN_GAB_ZO_LIST;

  // Производитель
  proizvSelectedElement: any = null;

  proizvSearch: ProizvSearchDTO = new ProizvSearchDTO();
  proizvDataTableInput: ProizvDTO[] = [];
  proizvTotalFoundedElements: number = 0;
  proizvFieldColumnList: string[] = FIELD_COLUMN_PROIZV_LIST;

  // Подразделение
  podrSelectedElement: any = null;

  podrSearch: PodrSearchDTO = new PodrSearchDTO();
  podrDataTableInput: PodrDTO[] = [];
  podrTotalFoundedElements: number = 0;
  podrFieldColumnList: string[] = FIELD_COLUMN_PODR_LIST;

  // Участок
  uchSelectedElement: any = null;

  isUchNotEmptyInPodr: boolean;
  uchSearch: UchSearchDTO = new UchSearchDTO();
  uchDataTableInput: UchDTO[] = [];
  uchTotalFoundedElements: number = 0;
  uchFieldColumnList: string[] = FIELD_COLUMN_UCH_LIST;

  dialogResult: DialogResult = DialogResult.CANCEL;
  currentRole: UserRoleAuth;                             // роль юзверя

  //ToDo при открытии модального окна автоматом загружать данные для таблицы у мало заполненных таблиц,
  // также при первой загрузке данных сохранять данные таблицы и серчить только после изменения
  constructor(private activeModal: NgbActiveModal,
              private klassService: OborudKlassService,
              private vidService: OborudVidService,
              private nalPuService: NalPuService,
              private gabZoService: GabZoService,
              private proizvService: ProizvService,
              private podrService: PodrService,
              private uchService: UchService,

              private eventService: EventService,
              private openDialogService: OpenDialogService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.initDialogDefault();
    this.onClickSearchKlassOborud();

    this._subscribeOborudKlassSelectedElement();
    this._subscribeOborudVidSelectedElement();
    this._subscribeNalPuSelectedElement();
    this._subscribeGabZoSelectedElement();
    this._subscribeProizvSelectedElement();
    this._subscribePodrSelectedElement();
    this._subscribeUchSelectedElement();
    this._subscribeCurrentRole();
  }

  initDialogDefault(){
    this.klassSearch.pageSize = 0;
    this.klassSearch.sortColumn = 'kodKlass';

    // this.vidSearch.pageSize = 0;
    // this.vidSearch.sortColumn = "naim";

    this.nalPuSearch.pageSize = 0;
    this.nalPuSearch.sortColumn = 'kodKlass';

    this.gabZoSearch.pageSize = 0;
    this.gabZoSearch.sortColumn = 'kodKlass';

    this.proizvSearch.pageSize = 0;
    this.proizvSearch.sortColumn = "naim";

    this.podrSearch.pageSize = 0;
    this.podrSearch.sortColumn = "naim";

    // this.uchSearch.pageSize = 0;
    // this.uchSearch.sortColumn = "naim";
  }

  _subscribeCurrentRole(){
    this.eventService.selectedCurrentRole$.subscribe( result => {
      this.currentRole = result;
    })
  }

  _subscribeOborudKlassSelectedElement(){
    this.eventService.selectedElementOborudKlassTable$.subscribe( result => {
      this.klassSelectedElement = result;
      this.vidSelectedElement = null;

      this.vidDataTableInput = [];
      this.vidService.findByKlassId(this.klassSelectedElement.id).subscribe( result => {
        this.vidDataTableInput = result;
      })
    })
  }
  _subscribeOborudVidSelectedElement(){
    this.eventService.selectedElementOborudVidTable$.subscribe( result => {
      this.vidSelectedElement = result;
    })
  }
  _subscribeNalPuSelectedElement(){
    this.eventService.selectedElementNalPuTable$.subscribe( result => {
      this.nalPuSelectedElement = result;
    })
  }
  _subscribeGabZoSelectedElement(){
    this.eventService.selectedElementGabZoTable$.subscribe( result => {
      this.gabZoSelectedElement = result;
    })
  }
  _subscribeProizvSelectedElement(){
    this.eventService.selectedElementProizvTable$.subscribe( result => {
      this.proizvSelectedElement = result;
    })
  }
  _subscribePodrSelectedElement(){
    this.eventService.selectedElementPodrTable$.subscribe( result => {
      this.podrSelectedElement = result;
      this.uchSelectedElement = null;

      this.uchDataTableInput = [];
      this.uchService.findByPodrId(this.podrSelectedElement.id).subscribe( resultUch => {
        this.uchDataTableInput = resultUch;

        this.isUchNotEmptyInPodr = resultUch.length == 0;
      }, error => {
        console.log('Произошла какая-то ошибка _subscribePodrSelectedElement() в settings.');
        this.toastService.showNegative('Произошла ошибка в загрузке данных "Участков"');
      })
    })
  }
  _subscribeUchSelectedElement(){
    this.eventService.selectedElementUchTable$.subscribe( result => {
      this.uchSelectedElement = result;
    })
  }

  public get OriginSourceTable(){
    return OriginSourceTable;
  }
  public get TableType(){
    return TableType;
  }
  public get ActionMode(){
    return ActionMode;
  }
  public get UserRole() {
    return UserRoleAuth;
  }

  onClickActionKlassOborud(mode: ActionMode){
    if (mode === ActionMode.VIEW)
      this.openDialogService.openPartOfKodKlassDialog(
        this.klassSelectedElement, TableType.OBORUD_KLASS, DialogMode.VIEW, this.klassDataTableInput)
    if (mode === ActionMode.CREATE){
      this.openDialogService.openPartOfKodKlassDialog(
        null, TableType.OBORUD_KLASS, DialogMode.CREATE, this.klassDataTableInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchKlassOborud();
        }
      })
    }
    if (mode === ActionMode.EDIT){
      this.openDialogService.openPartOfKodKlassDialog(
        this.klassSelectedElement, TableType.OBORUD_KLASS, DialogMode.EDIT, this.klassDataTableInput).closed.subscribe(result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchKlassOborud();
        }
      })
    }
    if (mode === ActionMode.DELETE){
      let isKlassNotEmpty: boolean = this.vidDataTableInput.length > 0;
      this.openDialogService.openElementConfirmDialog
      (this.klassSelectedElement, TableType.OBORUD_KLASS, DialogMode.DELETE, isKlassNotEmpty).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchKlassOborud();
        }
      })
    }
  }

  toSetAllSelectedElementsNull(){
    this.uchSelectedElement = null;
    this.podrSelectedElement = null;
    this.proizvSelectedElement = null;
    this.vidSelectedElement = null;
    this.klassSelectedElement = null;
    this.gabZoSelectedElement = null;
    this.nalPuSelectedElement = null;
  }

  onClickSearchKlassOborud(): void{
    this.toSetAllSelectedElementsNull();
    this.klassDataTableInput = [];
    this.vidDataTableInput = [];
    this.klassService.searchPage(this.klassSearch).subscribe( result => {
      this.klassDataTableInput = result.content;
    }, error => {
      console.log('Произошла какая-то ошибка onClickSearchKlassOborud() в settings.');
      this.toastService.showNegative('Произошла ошибка в загрузке данных "Класса Оборудования"');
    })
  }

  onClickActionVidOborud(mode: ActionMode){
    if (mode === ActionMode.VIEW)
      this.openDialogService.openPartOfKodKlassDialog(
        this.vidSelectedElement, TableType.OBORUD_VID, DialogMode.VIEW, this.vidDataTableInput, this.klassSelectedElement)
    if (mode === ActionMode.CREATE){
      this.openDialogService.openPartOfKodKlassDialog(
        null, TableType.OBORUD_VID, DialogMode.CREATE, this.vidDataTableInput, this.klassSelectedElement).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchKlassOborud();
        }
      })
    }
    if (mode === ActionMode.EDIT){
      this.openDialogService.openPartOfKodKlassDialog(
        this.vidSelectedElement, TableType.OBORUD_VID, DialogMode.EDIT, this.vidDataTableInput).closed.subscribe(result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchKlassOborud();
        }
      })
    }
    if (mode === ActionMode.DELETE){
      this.openDialogService.openElementConfirmDialog
      (this.vidSelectedElement, TableType.OBORUD_VID, DialogMode.DELETE).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchKlassOborud();
        }
      })
    }
  }

  onClickActionNalPu(mode: ActionMode){
    if (mode === ActionMode.VIEW)
      this.openDialogService.openPartOfKodKlassDialog(
        this.nalPuSelectedElement, TableType.NAL_PU, DialogMode.VIEW, this.nalPuDataTableInput)
    if (mode === ActionMode.CREATE){
      this.openDialogService.openPartOfKodKlassDialog(
        null, TableType.NAL_PU, DialogMode.CREATE, this.nalPuDataTableInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchNalPu();
        }
      })
    }
    if (mode === ActionMode.EDIT){
      this.openDialogService.openPartOfKodKlassDialog(
        this.nalPuSelectedElement, TableType.NAL_PU, DialogMode.EDIT, this.nalPuDataTableInput).closed.subscribe(result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchNalPu();
        }
      })
    }
    if (mode === ActionMode.DELETE){
      this.openDialogService.openElementConfirmDialog(
        this.nalPuSelectedElement, TableType.NAL_PU, DialogMode.DELETE).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchNalPu();
        }
      })
    }
  }

  onClickSearchNalPu(): void{
    this.toSetAllSelectedElementsNull();
    this.nalPuDataTableInput = [];
    this.nalPuService.searchPage(this.nalPuSearch).subscribe( result => {
      this.nalPuDataTableInput = result.content;
    }, error => {
      this.toastService.showNegative('Произошла ошибка в загрузке данных "Наличия ПУ"');
      console.log('Произошла какая-то ошибка onClickSearchNalPuOborud() в settings.');
    })
  }

  onClickActionGabZo(mode: ActionMode){
    if (mode === ActionMode.VIEW)
      this.openDialogService.openPartOfKodKlassDialog(
        this.gabZoSelectedElement, TableType.GAB_ZO, DialogMode.VIEW, this.gabZoDataTableInput)
    if (mode === ActionMode.CREATE){
      this.openDialogService.openPartOfKodKlassDialog(
        null, TableType.GAB_ZO, DialogMode.CREATE, this.gabZoDataTableInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchGabZo();
        }
      })
    }
    if (mode === ActionMode.EDIT){
      this.openDialogService.openPartOfKodKlassDialog(
        this.gabZoSelectedElement, TableType.GAB_ZO, DialogMode.EDIT, this.gabZoDataTableInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchGabZo();
        }
      })
    }
    if (mode === ActionMode.DELETE){
      this.openDialogService.openElementConfirmDialog(
        this.gabZoSelectedElement, TableType.GAB_ZO, DialogMode.DELETE).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchGabZo();
        }
      })
    }
  }

  onClickSearchGabZo(): void{
    this.toSetAllSelectedElementsNull();
    this.gabZoDataTableInput = [];
    this.gabZoService.searchPage(this.gabZoSearch).subscribe( result => {
      this.gabZoDataTableInput = result.content;
    }, error => {
      console.log('Произошла какая-то ошибка onClickSearchGabZo() в settings.');
      this.toastService.showNegative('Произошла ошибка в загрузке данных "Габариты Зоны Обработки"');
    })
  }

  onClickActionProizv(mode: ActionMode){
    if (mode === ActionMode.VIEW)
      this.openDialogService.openProizvDialog(this.proizvSelectedElement, DialogMode.VIEW)
    if (mode === ActionMode.CREATE){
      this.openDialogService.openProizvDialog(null, DialogMode.CREATE).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchProizv();
        }
      })
    }
    if (mode === ActionMode.EDIT){
      this.openDialogService.openProizvDialog(this.proizvSelectedElement, DialogMode.EDIT).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchProizv();
        }
      })
    }
    if (mode === ActionMode.DELETE){
      this.openDialogService.openElementConfirmDialog(this.proizvSelectedElement, TableType.PROIZV, DialogMode.DELETE).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchProizv();
        }
      })
    }
  }

  onClickSearchProizv(): void{
    this.toSetAllSelectedElementsNull();
    this.proizvDataTableInput = [];

    this.proizvService.searchPage(this.proizvSearch).subscribe( result => {
      this.proizvDataTableInput = result.content;
    }, error => {
      console.log('Произошла какая-то ошибка onClickSearchProizv() в settings.');
      this.toastService.showNegative('Произошла ошибка в загрузке данных "Производителей"');
    })
  }

  onClickActionPodr(mode: ActionMode){
    if (mode === ActionMode.VIEW)
      this.openDialogService.openPodrDialog(this.podrSelectedElement, DialogMode.VIEW, this.podrDataTableInput)
    if (mode === ActionMode.CREATE){
      this.openDialogService.openPodrDialog(null, DialogMode.CREATE, this.podrDataTableInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchPodr();
        }
      })
    }
    if (mode === ActionMode.EDIT){
      this.openDialogService.openPodrDialog(this.podrSelectedElement, DialogMode.EDIT, this.podrDataTableInput).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchPodr();
        }
      })
    }
    if (mode === ActionMode.DELETE){
      let isPodrNotEmpty: boolean = this.uchDataTableInput.length > 0;
      this.openDialogService.openElementConfirmDialog(this.podrSelectedElement, TableType.PODR, DialogMode.DELETE, isPodrNotEmpty).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchPodr();
        }
      })
    }
  }

  onClickSearchPodr(): void{
    this.toSetAllSelectedElementsNull();
    this.isUchNotEmptyInPodr = false;
    this.podrDataTableInput = [];
    this.uchDataTableInput = [];
    this.podrService.searchPage(this.podrSearch).subscribe( result => {
      this.podrDataTableInput = result.content;
    }, error => {
      console.log('Произошла какая-то ошибка onClickSearchPodr() в settings.');
      this.toastService.showNegative('Произошла ошибка в загрузке данных "Подразделения"');
    })
  }

  onClickActionUch(mode: ActionMode){
    if (mode === ActionMode.VIEW)
      this.openDialogService.openUchDialog(this.uchSelectedElement, DialogMode.VIEW, this.uchDataTableInput, this.podrSelectedElement)
    if (mode === ActionMode.CREATE){
      this.openDialogService.openUchDialog(null, DialogMode.CREATE, this.uchDataTableInput, this.podrSelectedElement).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchPodr();
        }
      })
    }
    if (mode === ActionMode.EDIT){
      this.openDialogService.openUchDialog(this.uchSelectedElement, DialogMode.EDIT, this.uchDataTableInput, this.podrSelectedElement).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchPodr();
        }
      })
    }
    if (mode === ActionMode.DELETE){
      this.openDialogService.openElementConfirmDialog(this.uchSelectedElement, TableType.UCH, DialogMode.DELETE).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchPodr();
        }
      })
    }
  }

  // присваивает к существующему search object пагинаторные свойства
  toSetNewSearchFromPage(newSearchPage: ABaseSearchDTO,
                         oldSearch: ProizvSearchDTO | OborudKlassSearchDTO | NalPuSearchDTO | GabZoSearchDTO | PodrSearchDTO){
    Object.keys(newSearchPage).forEach(key => {
      if (oldSearch.hasOwnProperty(key)) {
        oldSearch[key] = newSearchPage[key];
      }
    })
  }

  onChangePageKlassOborud(newDataSearch: ABaseSearchDTO): void{
    this.toSetNewSearchFromPage(newDataSearch, this.klassSearch);
    this.onClickSearchKlassOborud();
  }

  onChangePageNalPu(newDataSearch: ABaseSearchDTO): void{
    this.toSetNewSearchFromPage(newDataSearch, this.nalPuSearch);
    this.onClickSearchNalPu();
  }

  onChangePageGabZo(newDataSearch: ABaseSearchDTO): void{
    this.toSetNewSearchFromPage(newDataSearch, this.gabZoSearch);
    this.onClickSearchGabZo();
  }

  onChangePageProizv(newDataSearch: ABaseSearchDTO): void{
    this.toSetNewSearchFromPage(newDataSearch, this.proizvSearch);
    this.onClickSearchProizv();
  }

  onChangePagePodr(newDataSearch: ABaseSearchDTO): void{
    this.toSetNewSearchFromPage(newDataSearch, this.podrSearch);
    this.onClickSearchPodr();
  }

  onClickCloseModal(): void{
    this.activeModal.close(this.dialogResult);
  }
}
