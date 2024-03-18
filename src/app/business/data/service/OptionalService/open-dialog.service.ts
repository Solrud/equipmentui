import { Injectable } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {RelationshipCardDialogComponent} from "../../../view/dialog/relationship-card-dialog/relationship-card-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {

  constructor(private modalService: NgbModal,
              private configModalDialog: NgbModalConfig) {
    configModalDialog.backdrop = 'static';
    configModalDialog.keyboard = false;
  }


  openRelationshipCardDialog(){
    const openRelationshipCardDialog = this.modalService.open(RelationshipCardDialogComponent, {scrollable: true, size: "md", centered: true, modalDialogClass: "modal-config"});

    return openRelationshipCardDialog;
  }

  openDialog(){

  }

}
