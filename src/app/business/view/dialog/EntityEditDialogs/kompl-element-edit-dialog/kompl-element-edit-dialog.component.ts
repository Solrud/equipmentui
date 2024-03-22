import {Component, OnInit} from '@angular/core';
import {DialogMode, DialogResult, TableType} from "../../../../../app.constant";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {KomplDTO} from "../../../../data/model/dto/impl/KomplDTO";
import {KomplService} from "../../../../data/service/implements/kompl.service";

@Component({
  selector: 'app-kompl-element-edit-dialog',
  templateUrl: './kompl-element-edit-dialog.component.html',
  styleUrls: ['./kompl-element-edit-dialog.component.css']
})
export class KomplElementEditDialogComponent implements OnInit{
  dialogMode: DialogMode;
  selectedElement: any;

  fgKomplElement: FormGroup;

  newKompl: KomplDTO;

  constructor(private activeModal: NgbActiveModal,
              private komplService: KomplService) {
  }

  public get DialogMode(){
    return DialogMode;
  }
  public get Validators() {
    return Validators;
  }

  ngOnInit(): void {
    this.initDialogDefaultValues();
    this.initFgKomplElement();
    // console.log(this.dialogMode)
    // console.log(this.selectedElement)
  }

  initDialogDefaultValues(){
    if (!this.dialogMode) this.dialogMode = DialogMode.VIEW;
    if (!this.selectedElement) this.selectedElement = null;
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

  initFgKomplElement(){
    this.fgKomplElement = new FormGroup({
      id: new FormControl({value: this.getCorrectValueFromField('id'), disabled: true}),
      kod: new FormControl({value: this.getCorrectValueFromField('kod'), disabled: true}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: true}),
      tip: new FormControl({value: this.getCorrectValueFromField('tip'), disabled: true}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}, Validators.required),
      oborudovanie: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: true}),
    })
  }

  //получить идентификаторы обязательности заполнения поля
  fcFieldIsRequired(fcName: string, returnBoolean: boolean = false): any {
    let fcRequired = this.fgKomplElement.controls[fcName].hasValidator(Validators.required)
    return returnBoolean ? fcRequired : (fcRequired ? ' *' : '');
  }

  onSaveNewKompl(){
    this.newKompl = new KomplDTO();
    this.newKompl.id = this.fgKomplElement.controls['id'].value;
    this.newKompl.kod = this.fgKomplElement.controls['kod'].value;
    this.newKompl.akt = this.fgKomplElement.controls['akt'].value;
    this.newKompl.tip = this.fgKomplElement.controls['tip'].value;
    this.newKompl.naim = this.fgKomplElement.controls['naim'].value;
    this.newKompl.oborudovanie = this.fgKomplElement.controls['oborudovanie'].value;
  }

  onClickCreateKompl(){
    this.onSaveNewKompl();
    this.komplService.create(this.newKompl).subscribe( result => {
      if(result){
        this.activeModal.close(DialogResult.ACCEPT);
      }
    }, error => {
      console.log('Ошибка в диалоге KomplElementEditDialogComponent, onClickCreateKompl()')
    })
  }

  onClickUpdateKompl(){
    this.onSaveNewKompl();
    this.komplService.update(this.newKompl).subscribe( result => {
      if(result){
        this.activeModal.close(DialogResult.ACCEPT);
      }
    }, error => {
      console.log('Ошибка в диалоге KomplElementEditDialogComponent, onClickUpdateKompl()')
    })
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
