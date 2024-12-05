import {Component, OnInit} from '@angular/core';
import {DialogResult} from "../../../../app.constant";
import {TranslateService} from "@ngx-translate/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.css']
})
export class InformationDialogComponent implements OnInit{
  dialogTitle: string;
  dialogMessage: string;
  buttonConfirm: boolean;

  constructor(private activeModal: NgbActiveModal,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.initDialogDefault();
  }

  initDialogDefault(): void {
    if (!this.dialogTitle) this.dialogTitle = this.translateService.instant("TEXT.INFORMATION");
    if (!this.dialogMessage) this.dialogMessage = this.translateService.instant("TEXT.INFORMATION-IS-EMPTY");
    if (!this.buttonConfirm) this.buttonConfirm = false;
  }

  onClickConfirm(): void {
    this.activeModal.close(DialogResult.ACCEPT);
  }

  onClickCancel(): void {
    this.activeModal.dismiss(DialogResult.EXIT);
  }
}
