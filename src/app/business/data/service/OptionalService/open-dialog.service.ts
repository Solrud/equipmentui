import {Injectable} from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {GruppaElementEditDialogComponent} from "../../../view/dialog/EntityEditDialogs/gruppa-element-edit-dialog/gruppa-element-edit-dialog.component";
import {KomplElementEditDialogComponent} from "../../../view/dialog/EntityEditDialogs/kompl-element-edit-dialog/kompl-element-edit-dialog.component";
import {ModelElementEditDialogComponent} from "../../../view/dialog/EntityEditDialogs/model-element-edit-dialog/model-element-edit-dialog.component";
import {OborudEkzElementEditDialogComponent} from "../../../view/dialog/EntityEditDialogs/oborud-ekz-element-edit-dialog/oborud-ekz-element-edit-dialog.component";
import {KomplRelationshipDialogComponent} from "../../../view/dialog/TableRelationshipDialogs/kompl-relationship-dialog/kompl-relationship-dialog.component";
import {GruppaRelationshipDialogComponent} from "../../../view/dialog/TableRelationshipDialogs/gruppa-relationship-dialog/gruppa-relationship-dialog.component";
import {ModelRelationshipDialogComponent} from "../../../view/dialog/TableRelationshipDialogs/model-relationship-dialog/model-relationship-dialog.component";
import {OborudEkzRelationshipDialogComponent} from "../../../view/dialog/TableRelationshipDialogs/oborud-ekz-relationship-dialog/oborud-ekz-relationship-dialog.component";
import {DialogMode, TableType} from "../../../../app.constant";
import {ConfirmDialogComponent} from "../../../view/dialog/confirm-dialog/confirm-dialog.component";
import {SettingsDialogComponent} from "../../../view/dialog/settings-dialog/settings-dialog.component";
import {PartOfKodKlassEditDialogComponent} from "../../../view/dialog/OtherSpravochnikEdit/part-of-kod-klass-edit-dialog/part-of-kod-klass-edit-dialog.component";
import {OborudKlassDTO} from "../../model/dto/impl/OborudKlassDTO";
import {ProizvEditDialogComponent} from "../../../view/dialog/OtherSpravochnikEdit/proizv-edit-dialog/proizv-edit-dialog.component";
import {ProizvDTO} from "../../model/dto/impl/ProizvDTO";
import {PodrDTO} from "../../model/dto/impl/PodrDTO";
import {PodrEditDialogComponent} from "../../../view/dialog/OtherSpravochnikEdit/podr-edit-dialog/podr-edit-dialog.component";
import {UchDTO} from "../../model/dto/impl/UchDTO";
import {UchEditDialogComponent} from "../../../view/dialog/OtherSpravochnikEdit/uch-edit-dialog/uch-edit-dialog.component";
import {GruppaDTO} from "../../model/dto/impl/GruppaDTO";
import {ModelDTO} from "../../model/dto/impl/ModelDTO";
import {AttachedElementFromTableEditDialogComponent} from "../../../view/dialog/attached-element-from-table-edit-dialog/attached-element-from-table-edit-dialog.component";
import {KomplDTO} from "../../model/dto/impl/KomplDTO";

@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {
  toCenteredModal: boolean = false;

  constructor(private modalService: NgbModal,
              private configModalDialog: NgbModalConfig) {
    configModalDialog.backdrop = 'static';
    configModalDialog.keyboard = false;
  }

  //---=========| Модалки изменения элементов в таблице |==========---
  openElementDialog(selectedElement: any, selectedNavBar: TableType, dialogMode: DialogMode){
    switch (selectedNavBar) {
      case TableType.KOMPL:
        const openKomplElementEditDialog = this.modalService.open(KomplElementEditDialogComponent, {
            scrollable: true,
            size: "md",
            centered: this.toCenteredModal,
            modalDialogClass: "modal-config"
        });
        if (dialogMode != DialogMode.CREATE)
          openKomplElementEditDialog.componentInstance.selectedElement = selectedElement;
        openKomplElementEditDialog.componentInstance.dialogMode = dialogMode;

        return openKomplElementEditDialog;
      case TableType.GRUPPA:
        const openGruppaElementEditDialog = this.modalService.open(GruppaElementEditDialogComponent, {
          scrollable: true,
          size: "lg",
          centered: this.toCenteredModal,
          modalDialogClass: "modal-config"
        });
        if (dialogMode != DialogMode.CREATE)
          openGruppaElementEditDialog.componentInstance.selectedElement = selectedElement;
        openGruppaElementEditDialog.componentInstance.dialogMode = dialogMode;

        return openGruppaElementEditDialog;
      case TableType.MODEL:
        const openModelElementEditDialog = this.modalService.open(ModelElementEditDialogComponent, {
          scrollable: true,
          size: "md",
          centered: this.toCenteredModal,
          modalDialogClass: "modal-config"
        });
        if (dialogMode != DialogMode.CREATE)
          openModelElementEditDialog.componentInstance.selectedElement = selectedElement;
        openModelElementEditDialog.componentInstance.dialogMode = dialogMode;

        return openModelElementEditDialog;
      case TableType.OBORUD_EKZ:

        const openOborudEkzElementEditDialog = this.modalService.open(OborudEkzElementEditDialogComponent, {
          scrollable: true,
          size: "lg",
          centered: this.toCenteredModal,
          modalDialogClass: "modal-config"
        });
        if (dialogMode != DialogMode.CREATE) openOborudEkzElementEditDialog.componentInstance.selectedElement = selectedElement;
        openOborudEkzElementEditDialog.componentInstance.dialogMode = dialogMode;

        return openOborudEkzElementEditDialog;
      default:
        return null;
    }
  }

  //---=========| Модалки изменения связей |==========---
  openKomplRelationshipDialog(selectedSourceSpravochnik: TableType, selectedElement: any, joinedKomplList: KomplDTO[]){
    const openKomplRelationshipDialog = this.modalService.open(KomplRelationshipDialogComponent,
      {scrollable: true, size: "lg", centered: this.toCenteredModal});
    openKomplRelationshipDialog.componentInstance.selectedSourceSpravochnik = selectedSourceSpravochnik;
    openKomplRelationshipDialog.componentInstance.selectedElement = selectedElement;
    openKomplRelationshipDialog.componentInstance.joinedKomplList = joinedKomplList.slice();
    return openKomplRelationshipDialog;
  }

  openGruppaRelationshipDialog(selectedSourceSpravochnik: TableType, selectedElement: any, joinedGruppaList: GruppaDTO[]){
    const openGruppaRelationshipDialog = this.modalService.open(GruppaRelationshipDialogComponent,
      {scrollable: true, size: "lg", centered: this.toCenteredModal});
    openGruppaRelationshipDialog.componentInstance.selectedSourceSpravochnik = selectedSourceSpravochnik;
    openGruppaRelationshipDialog.componentInstance.selectedElement = selectedElement;
    openGruppaRelationshipDialog.componentInstance.joinedGruppaList = joinedGruppaList.slice();
    return openGruppaRelationshipDialog;
  }

  openModelRelationshipDialog(selectedSourceSpravochnik: TableType, selectedElement: any, joinedModelList: ModelDTO[]){
    const openModelRelationshipDialog = this.modalService.open(ModelRelationshipDialogComponent,
      {scrollable: true, size: "lg", centered: this.toCenteredModal});
    openModelRelationshipDialog.componentInstance.selectedSourceSpravochnik = selectedSourceSpravochnik;
    openModelRelationshipDialog.componentInstance.selectedElement = selectedElement;
    openModelRelationshipDialog.componentInstance.joinedModelList = joinedModelList.slice();
    return openModelRelationshipDialog;
  }

  openOborudEkzRelationshipDialog(){
    const openOborudEkzRelationshipDialog = this.modalService.open(OborudEkzRelationshipDialogComponent, {scrollable: true, size: "md", centered: true});
  }

  //---=========| Модалки удаления | Изменения активности |=========---
  openElementConfirmDialog(selectedElement: any, selectedNavBar: TableType, dialogMode: DialogMode){
    const confirmDialogComponent = this.modalService.open(ConfirmDialogComponent,
      {scrollable: true, size: "md", centered: this.toCenteredModal, modalDialogClass: "modal-config"});
    confirmDialogComponent.componentInstance.selectedElement = selectedElement;
    confirmDialogComponent.componentInstance.selectedNavBar = selectedNavBar;
    confirmDialogComponent.componentInstance.dialogMode = dialogMode;
    return confirmDialogComponent;
  }

  //---=========| Модалка настроек |=========---
  openSettingsDialog(){
    const openSettingsDialog = this.modalService.open(SettingsDialogComponent,
      {scrollable: true, centered: this.toCenteredModal, modalDialogClass: "modal-settings-config"});
    return openSettingsDialog;
  }

  //---=========| Модалка с выбираемым элементом из таблички |=========---
  openAttachedElementFromTableDialog(selectedElement: ModelDTO, dialogMode: DialogMode){
    const openAttachedElementFromTableDialog = this.modalService.open(AttachedElementFromTableEditDialogComponent,
      {scrollable: true, centered: this.toCenteredModal, size: "lg"});
    openAttachedElementFromTableDialog.componentInstance.selectedElement = selectedElement;
    openAttachedElementFromTableDialog.componentInstance.dialogMode = dialogMode;

    return openAttachedElementFromTableDialog;
  }

  //---=========| Модалки изменения справочников в настройках |=========---
  openPartOfKodKlassDialog(selectedElement: any, selectedNavBar: TableType, dialogMode: DialogMode,
                           listFromElement: any[], klassForVid: OborudKlassDTO = null){
    const openPartOfKodKlassDialog = this.modalService.open(PartOfKodKlassEditDialogComponent,
      {scrollable: true, size: "md", centered: this.toCenteredModal})
    openPartOfKodKlassDialog.componentInstance.selectedElement = selectedElement;
    openPartOfKodKlassDialog.componentInstance.listFromElement = listFromElement;
    openPartOfKodKlassDialog.componentInstance.selectedNavBar = selectedNavBar;
    openPartOfKodKlassDialog.componentInstance.dialogMode = dialogMode;
    openPartOfKodKlassDialog.componentInstance.klassForVid = klassForVid;
    return openPartOfKodKlassDialog;
  }

  openProizvDialog(selectedElement: ProizvDTO, dialogMode: DialogMode){
    const openProizvDialog = this.modalService.open(ProizvEditDialogComponent)
    openProizvDialog.componentInstance.selectedElement = selectedElement;
    openProizvDialog.componentInstance.dialogMode = dialogMode;
    return openProizvDialog;
  }

  openPodrDialog(selectedElement: PodrDTO, dialogMode: DialogMode, podrList: PodrDTO[]){
    const openPodrDialog = this.modalService.open(PodrEditDialogComponent,
    {scrollable: true, size: "lg", centered: this.toCenteredModal})
    openPodrDialog.componentInstance.selectedElement = selectedElement;
    openPodrDialog.componentInstance.dialogMode = dialogMode;
    openPodrDialog.componentInstance.podrList = podrList; // чтоб проверить коды и какой родитель подразделения
    return openPodrDialog;
  }

  openUchDialog(selectedElement: UchDTO, dialogMode: DialogMode, uchList: UchDTO[], podrByUch: PodrDTO){
    const openUchDialog = this.modalService.open(UchEditDialogComponent,
      {scrollable: true, size: "lg", centered: this.toCenteredModal})
    openUchDialog.componentInstance.selectedElement = selectedElement;
    openUchDialog.componentInstance.dialogMode = dialogMode;
    openUchDialog.componentInstance.uchList = uchList;
    openUchDialog.componentInstance.podrByUch = podrByUch;
    return openUchDialog;
  }
}
