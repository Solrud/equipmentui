import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DialogMode, DialogResult, TableType} from "../../../../../app.constant";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {GruppaDTO} from "../../../../data/model/dto/impl/GruppaDTO";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-gruppa-element-edit-dialog',
  templateUrl: './gruppa-element-edit-dialog.component.html',
  styleUrls: ['./gruppa-element-edit-dialog.component.css']
})
export class GruppaElementEditDialogComponent implements OnInit{
  dialogMode: DialogMode;
  selectedElement: any;

  fgGruppaElement: FormGroup;

  newGruppa: GruppaDTO;

  constructor(private activeModal: NgbActiveModal,
              private gruppaService: GruppaService) {
  }

  ngOnInit(): void {
    this.initDialogDefaultValues();
    this.initFgGruppaElement();
  }

  public get DialogMode(){
    return DialogMode;
  }
  public get Validators() {
    return Validators;
  }

  getCorrectValueFromField(field: string){
    if (this.dialogMode === DialogMode.CREATE){
      if (field == 'akt') return 1;
      if (field == 'tip') return "2";
      if (field == 'modely') return [];
    }
    if (this.selectedElement) return this.selectedElement[field];
    return null;
  }

  initDialogDefaultValues(){
    if (!this.dialogMode) this.dialogMode = DialogMode.VIEW;
    if (!this.selectedElement) this.selectedElement = null;
  }

  initFgGruppaElement(){
    this.fgGruppaElement = new FormGroup({
      id: new FormControl({value: this.getCorrectValueFromField('id'), disabled: true}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: true}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}, Validators.required),
      kod: new FormControl({value: this.getCorrectValueFromField('kod'), disabled: true}),
      kodKlass: new FormControl({value: this.getCorrectValueFromField('kodKlass'), disabled: false}, Validators.required),
      modely: new FormControl({value: this.getCorrectValueFromField('modely'), disabled: true}),
      rod: new FormControl({value: this.getCorrectValueFromField('rod'), disabled: true}),
      vid: new FormControl({value: this.getCorrectValueFromField('vid'), disabled: true}),
      tip: new FormControl({value: this.getCorrectValueFromField('tip'), disabled: true}),
      //ToDo gabarity, gruppa и py пока что нет, так как код классификации в ручную
      gabarity: new FormControl({value: this.getCorrectValueFromField('gabarity'), disabled: true}),
      py: new FormControl({value: this.getCorrectValueFromField('py'), disabled: true}),
      gruppa: new FormControl({value: this.getCorrectValueFromField('gruppa'), disabled: true}),
    })
  }

  onSaveNewGruppa(){
    this.newGruppa = new GruppaDTO();
    this.newGruppa.id = this.fgGruppaElement.controls['id'].value;
    this.newGruppa.akt = this.fgGruppaElement.controls['akt'].value;
    this.newGruppa.naim = this.fgGruppaElement.controls['naim'].value;
    this.newGruppa.kod = this.fgGruppaElement.controls['kod'].value;
    this.newGruppa.kodKlass = this.fgGruppaElement.controls['kodKlass'].value;
    this.newGruppa.modely = this.fgGruppaElement.controls['modely'].value;
    this.newGruppa.rod = this.fgGruppaElement.controls['rod'].value;
    this.newGruppa.vid = this.fgGruppaElement.controls['vid'].value;
    this.newGruppa.tip = this.fgGruppaElement.controls['tip'].value;
  }

  //получить идентификаторы обязательности заполнения поля
  fcFieldIsRequired(fcName: string, returnBoolean: boolean = false): any {
    let fcRequired = this.fgGruppaElement.controls[fcName].hasValidator(Validators.required)
    return returnBoolean ? fcRequired : (fcRequired ? ' *' : '');
  }

  onClickUpdateGruppa(){
    this.onSaveNewGruppa();
    this.gruppaService.update(this.newGruppa).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT)
      }
    }, error => {
      console.log('Ошибка GruppaElementEditDialogComponent onClickUpdateGruppa()')
    })
  }

  onClickCreateGruppa(){
    this.onSaveNewGruppa();
    this.gruppaService.create(this.newGruppa).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT)
      }
    }, error => {
      console.log('Ошибка GruppaElementEditDialogComponent onClickCreateGruppa()')
    })
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
