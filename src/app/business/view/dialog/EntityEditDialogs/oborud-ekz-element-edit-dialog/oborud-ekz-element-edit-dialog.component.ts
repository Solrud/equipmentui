import {Component, OnInit} from '@angular/core';
import {DialogMode, DialogResult} from "../../../../../app.constant";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {KomplDTO} from "../../../../data/model/dto/impl/KomplDTO";
import {OborudEkzDTO} from "../../../../data/model/dto/impl/OborudEkzDTO";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OborudEkzService} from "../../../../data/service/implements/oborud-ekz.service";
import {ProizvService} from "../../../../data/service/implements/proizv.service";
import { UchService } from 'src/app/business/data/service/implements/uch.service';
import {PodrService} from "../../../../data/service/implements/podr.service";
import {ProizvDTO} from "../../../../data/model/dto/impl/ProizvDTO";

@Component({
  selector: 'app-oborud-ekz-element-edit-dialog',
  templateUrl: './oborud-ekz-element-edit-dialog.component.html',
  styleUrls: ['./oborud-ekz-element-edit-dialog.component.css']
})
export class OborudEkzElementEditDialogComponent implements OnInit{
  dialogMode: DialogMode;
  selectedElement: any;

  fgOborudEkzElement: FormGroup;

  newOborudEkz: OborudEkzDTO; //новый экз для сохранения

  proizvListDDM: ProizvDTO[];

  constructor(private activeModal: NgbActiveModal,
              private oborudEkzService: OborudEkzService,
              private proizvService: ProizvService,
              private uchService: UchService,
              private podrService: PodrService) {
  }

  ngOnInit(): void {
    this.initDialogDefaultValues();
    this.initFgOborudEkzElement();
  }

  public get DialogMode(){
    return DialogMode;
  }
  public get Validators() {
    return Validators;
  }

  initDialogDefaultValues(){
    if (!this.dialogMode) this.dialogMode = DialogMode.VIEW;
    if (!this.selectedElement) this.selectedElement = null;

    this.proizvService.searchAll().subscribe( result => {
      if (result && result.length > 0)
        this.proizvListDDM = result;
    })
  }

  getCorrectValueFromField(field: string): any{
    if (this.dialogMode === DialogMode.CREATE){
      if (field == 'akt') return 1;
      if (field == 'tip') return "3";
      if (field == 'oborudovanie') return [];
    }
    if (this.selectedElement) return this.selectedElement[field];
    return null;
  }

  initFgOborudEkzElement(){
    this.fgOborudEkzElement = new FormGroup({
      id: new FormControl({value: this.getCorrectValueFromField('id'), disabled: true}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: true}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}, Validators.required),
      serNom: new FormControl({value: this.getCorrectValueFromField('serNom'), disabled: false}, Validators.required),
      invNom: new FormControl({value: this.getCorrectValueFromField('invNom'), disabled: false}, Validators.required),
      podr: new FormControl({value: this.getCorrectValueFromField('podr'), disabled: false}, Validators.required),
      uch: new FormControl({value: this.getCorrectValueFromField('uch'), disabled: false}, Validators.required),
      proizv: new FormControl({value: this.getCorrectValueFromField('proizv'), disabled: false}, Validators.required),
      model: new FormControl({value: this.getCorrectValueFromField('model'), disabled: true}),

      //ToDo примечание в оборуд екз?
      // primechanie: new FormControl({value: this.getCorrectValueFromField('primechanie'), disabled: true}),
    })
  }

  //получить идентификаторы обязательности заполнения поля
  fcFieldIsRequired(fcName: string, returnBoolean: boolean = false): any {
    let fcRequired = this.fgOborudEkzElement.controls[fcName].hasValidator(Validators.required)
    return returnBoolean ? fcRequired : (fcRequired ? ' *' : '');
  }

  onClickSelectDDI(proizv: ProizvDTO){
    console.log(proizv);
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
