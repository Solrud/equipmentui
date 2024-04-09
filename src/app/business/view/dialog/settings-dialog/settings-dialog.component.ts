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
  TableType
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

  //ToDo bootstrap'овская пагинация.. так лень ее делать

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

    this.onClickSearchKlassOborud();

    this._subscribeOborudKlassSelectedElement();
    this._subscribeOborudVidSelectedElement();
    this._subscribeNalPuSelectedElement();
    this._subscribeGabZoSelectedElement();
    this._subscribeProizvSelectedElement();
    this._subscribePodrSelectedElement();
    this._subscribeUchSelectedElement();
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
      console.log(result)
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
      this.uchService.findByPodrId(this.podrSelectedElement.id).subscribe( result => {
        console.log(result);
        this.uchDataTableInput = result;

        this.isUchNotEmptyInPodr = result.length == 0;
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

  onClickActionKlassOborud(mode: ActionMode){
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
      this.openDialogService.openElementConfirmDialog
      (this.klassSelectedElement, TableType.OBORUD_KLASS, DialogMode.DELETE).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchKlassOborud();
        }
      })
    }
  }

  onClickSearchKlassOborud(): void{
    this.klassDataTableInput = [];
    this.vidSelectedElement = null;
    this.vidDataTableInput = [];
    this.klassService.searchAll().subscribe( result => {
      this.klassDataTableInput = result;
    }, error => {
      console.log('Произошла какая-то ошибка onClickSearchKlassOborud() в settings.');
    })
  }

  onClickActionVidOborud(mode: ActionMode){
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
    this.nalPuDataTableInput = [];
    this.nalPuService.searchAll().subscribe( result => {
      this.nalPuDataTableInput = result;
    }, error => {

      console.log('Произошла какая-то ошибка onClickSearchNalPuOborud() в settings.');
    })
    // if (nalPuSearch){
    //   this.nalPuSearch = nalPuSearch;
    //   this.nalPuDataTableInput = [];
    //   this.nalPuService.searchPage(this.nalPuSearch).subscribe( result => {
    //     console.log(result);
    //     this.nalPuDataTableInput = result.content;
    //     this.nalPuTotalFoundedElements = result.totalElements;
    //
    //     this.nalPuSearch.pageSize = this.nalPuTotalFoundedElements; // временно, надо думать все ли выводить или спраляться с пагинтором
    //   }, error => {
    //     console.log('Произошла какая-то ошибка onClickSearchVidOborud() в settings.');
    //   })
    // }
  }

  onClickActionGabZo(mode: ActionMode){
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
    this.gabZoDataTableInput = [];
    this.gabZoService.searchAll().subscribe( result => {
      this.gabZoDataTableInput = result;
    }, error => {
      console.log('Произошла какая-то ошибка onClickSearchGabZo() в settings.');
    })
  }

  onClickActionProizv(mode: ActionMode){
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
    this.proizvDataTableInput = [];
    this.proizvService.searchAll().subscribe( result => {
      this.proizvDataTableInput = result;
    }, error => {
      console.log('Произошла какая-то ошибка onClickSearchProizv() в settings.');
    })
  }

  onClickActionPodr(mode: ActionMode){
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
      this.openDialogService.openElementConfirmDialog(this.podrSelectedElement, TableType.PODR, DialogMode.DELETE).closed.subscribe( result => {
        if (result === DialogResult.ACCEPT){
          this.dialogResult = DialogResult.ACCEPT;
          this.onClickSearchPodr();
        }
      })
    }
  }

  onClickSearchPodr(): void{
    this.isUchNotEmptyInPodr = false;
    this.podrDataTableInput = [];
    this.uchDataTableInput = [];
    this.uchSelectedElement = null;
    this.podrService.searchAll().subscribe( result => {
      this.podrDataTableInput = result;
    }, error => {
      console.log('Произошла какая-то ошибка onClickSearchPodr() в settings.');
    })
  }

  onClickActionUch(mode: ActionMode){
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

  onClickCloseModal(): void{
    this.activeModal.close(this.dialogResult);
  }
}
