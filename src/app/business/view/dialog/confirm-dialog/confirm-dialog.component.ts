import {Component, OnInit} from '@angular/core';
import {DialogMode, DialogResult, TableType} from "../../../../app.constant";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {KomplService} from "../../../data/service/implements/kompl.service";
import {GruppaService} from "../../../data/service/implements/gruppa.service";
import {ModelService} from "../../../data/service/implements/model.service";
import {OborudEkzService} from "../../../data/service/implements/oborud-ekz.service";
import {OborudKlassService} from "../../../data/service/implements/oborud-klass.service";
import {OborudVidService} from "../../../data/service/implements/oborud-vid.service";
import {NalPuService} from "../../../data/service/implements/nal-pu.service";
import {GabZoService} from "../../../data/service/implements/gab-zo.service";
import {ProizvService} from "../../../data/service/implements/proizv.service";
import {PodrService} from "../../../data/service/implements/podr.service";
import {UchService} from "../../../data/service/implements/uch.service";
import {ToastService} from "../../../data/service/OptionalService/toast.service";


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit{
  dialogMode: DialogMode;
  selectedNavBar: TableType;
  selectedElement: any;
  isKlassNotEmpty; boolean;

  newElement: any;

  currentService: any;

  constructor(private activeModal: NgbActiveModal,
              private komplService: KomplService,
              private gruppaService: GruppaService,
              private modelService: ModelService,
              private oborudEkzService: OborudEkzService,
              private klassService: OborudKlassService,
              private vidService: OborudVidService,
              private nalPuService: NalPuService,
              private gabZoService: GabZoService,
              private proizvService: ProizvService,
              private podrService: PodrService,
              private uchService: UchService,
              private toastService: ToastService
              ) {
  }

  ngOnInit(): void {
    this.newElement = this.selectedElement;
    this.initTableTypeService();
  }

  public get DialogMode(){
    return DialogMode;
  }

  public get TableType(){
    return TableType;
  }

  initTableTypeService(): void{
    switch (this.selectedNavBar) {
      case TableType.KOMPL:
        this.currentService = this.komplService;
        break;
      case TableType.GRUPPA:
        this.currentService = this.gruppaService;
        break;
      case TableType.MODEL:
        this.currentService = this.modelService;
        break;
      case TableType.OBORUD_EKZ:
        this.currentService = this.oborudEkzService;
        break;
      case TableType.OBORUD_KLASS:
        this.currentService = this.klassService;
        break;
      case TableType.OBORUD_VID:
        this.currentService = this.vidService;
        break;
      case TableType.NAL_PU:
        this.currentService = this.nalPuService;
        break;
      case TableType.GAB_ZO:
        this.currentService = this.gabZoService;
        break;
      case TableType.PROIZV:
        this.currentService = this.proizvService;
        break;
      case TableType.PODR:
        this.currentService = this.podrService;
        break;
      case TableType.UCH:
        this.currentService = this.uchService;
        break;
      default:
        return null;
    }
  }

  onClickDelete(): void{
    this.currentService.delete(this.newElement.id).subscribe(result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT);
        this.toastService.showPositive('Успешно удалено');
      }
    }, error => {
      console.log('Ошибка в ConfirmDialogComponent onClickDelete()')
      this.toastService.showNegative('Не удалось удалить элемент');
    })
  }

  onClickChangeAkt(): void{
    this.newElement.akt = this.newElement.akt == 1 ? 0 : 1;
    this.currentService.update(this.newElement).subscribe(result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT);
        this.toastService.showPositive('Успешно изменена активность');
      }
    }, error => {
      this.toastService.showNegative('Не удалось изменить активность');
      console.log('Ошибка в ConfirmDialogComponent onClickChangeAkt()')
    })
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
