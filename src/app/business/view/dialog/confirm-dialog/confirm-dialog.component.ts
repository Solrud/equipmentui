import {Component, OnInit} from '@angular/core';
import {DialogMode, DialogResult, TableType} from "../../../../app.constant";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {KomplService} from "../../../data/service/implements/kompl.service";
import {GruppaService} from "../../../data/service/implements/gruppa.service";
import {ModelService} from "../../../data/service/implements/model.service";
import {OborudEkzService} from "../../../data/service/implements/oborud-ekz.service";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit{
  dialogMode: DialogMode;
  selectedNavBar: TableType;
  selectedElement: any;

  newElement: any;

  tabletypeService: any;

  constructor(private activeModal: NgbActiveModal,
              private komplService: KomplService,
              private gruppaService: GruppaService,
              private modelService: ModelService,
              private oborudEkzService: OborudEkzService,
              ) {
  }

  ngOnInit(): void {
    this.newElement = this.selectedElement;
    this.initTableTypeService();
    // console.log(this.newElement);
    // console.log(this.tabletypeService)
  }

  public get DialogMode(){
    return DialogMode;
  }

  initTableTypeService(): void{
    switch (this.selectedNavBar) {
      case TableType.KOMPL:
        this.tabletypeService = this.komplService;
        break;
      case TableType.GRUPPA:
        this.tabletypeService = this.gruppaService;
        break;
      case TableType.MODEL:
        this.tabletypeService = this.modelService;
        break;
      case TableType.OBORUD_EKZ:
        this.tabletypeService = this.oborudEkzService;
        break;
      default:
        return null;
    }
  }

  onClickDelete(): void{
    this.tabletypeService.delete(this.newElement.id).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT);
      }
    }, error => {
      console.log('Ошибка в ConfirmDialogComponent onClickDelete()')
    })
  }

  onClickChangeAkt(): void{
    this.newElement.akt = this.newElement.akt == 1 ? 0 : 1;
    this.tabletypeService.update(this.newElement).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT);
      }
    }, error => {
      console.log('Ошибка в ConfirmDialogComponent onClickChangeAkt()')
    })
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
