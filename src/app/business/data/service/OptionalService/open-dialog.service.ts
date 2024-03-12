import { Injectable } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {EquipmentDialogComponent} from "../../../view/dialog/equipment-dialog/equipment-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {

  constructor(private modalService: NgbModal,
              private configModalDialog: NgbModalConfig) { }


  openEquipmentDialog(){
    const openEquipmentDialog = this.modalService.open(EquipmentDialogComponent, {scrollable: true, size: "md", centered: true, modalDialogClass: "modal-config"});

    return openEquipmentDialog;
  }

  openSpravochnikDialog(){

  }

}
