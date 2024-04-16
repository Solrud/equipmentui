import {Component, OnInit} from '@angular/core';
import {ProizvDTO} from "../../../../data/model/dto/impl/ProizvDTO";
import {DialogMode, DialogResult} from "../../../../../app.constant";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {UchDTO} from "../../../../data/model/dto/impl/UchDTO";
import {PodrDTO} from "../../../../data/model/dto/impl/PodrDTO";
import {UchService} from "../../../../data/service/implements/uch.service";
import {ToastService} from "../../../../data/service/OptionalService/toast.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-uch-edit-dialog',
  templateUrl: './uch-edit-dialog.component.html',
  styleUrls: ['./uch-edit-dialog.component.css']
})
export class UchEditDialogComponent implements OnInit{
  selectedElement: UchDTO;
  dialogMode: DialogMode;
  uchList: UchDTO[];
  podrByUch: PodrDTO;

  newUch: UchDTO;
  fgUch: FormGroup;
  isSameKodExist: boolean = false;
  readonly validatorMinLength: ValidatorFn = Validators.minLength(1000000000);

  constructor(private activeModal: NgbActiveModal,
              private uchService: UchService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.initDialogDefault();
    this.initFgUch();

    this._observeFcKod();
  }

  public get DialogMode(){
    return DialogMode;
  }
  public get Validators() {
    return Validators;
  }

  initDialogDefault(){
    if (!this.dialogMode) this.dialogMode = DialogMode.VIEW;
    if (!this.selectedElement) this.selectedElement = null;
  }

  getCorrectValueFromField(field: string){
    if(field == 'podr') return this.podrByUch.obozn + ' | ' + this.podrByUch.naim;
    if (this.selectedElement){
      return this.selectedElement[field];
    }
    return null;
  }

  initFgUch(){
    this.fgUch = new FormGroup({
      id: new FormControl({value: this.getCorrectValueFromField('id'), disabled: true}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}, Validators.required),
      obozn: new FormControl({value: this.getCorrectValueFromField('obozn'), disabled: false}, Validators.required),
      kod: new FormControl({value: this.getCorrectValueFromField('kod'), disabled: false}, Validators.required),
      podr: new FormControl({value: this.getCorrectValueFromField('podr'), disabled: true}),
    })
  }

  //получить идентификаторы обязательности заполнения поля
  fcFieldIsRequired(fcName: string, returnBoolean: boolean = false): any {
    let fcRequired = this.fgUch.controls[fcName].hasValidator(Validators.required)
    return returnBoolean ? fcRequired : (fcRequired ? ' *' : '');
  }

  //добавляет или удаляет валидаторы у указанного контрола
  changeValidators(controlName: string, validators: ValidatorFn[], deleteValidators: boolean = false): void {
    deleteValidators ?
      this.fgUch.get(controlName).removeValidators(validators) :
      this.fgUch.get(controlName).addValidators(validators);
    this.fgUch.controls[controlName].updateValueAndValidity({onlySelf: false, emitEvent: false});
  }

 _observeFcKod(){
    this.fgUch.controls['kod'].valueChanges.pipe(
      tap( val => {
        this.isSameKodExist = false;
        this.changeValidators('kod', [this.validatorMinLength],true);
      })
    ).subscribe( inputValue => {
      if (this.uchList.some( uch => {return uch.kod.trim() == inputValue}) && this.selectedElement?.kod != inputValue){
        this.isSameKodExist = true;
        this.changeValidators('kod', [this.validatorMinLength],false);
      }
    })
 }

  onSaveUch(){
    this.newUch = new UchDTO;
    this.newUch.id = this.fgUch.controls['id'].value;
    this.newUch.naim = this.fgUch.controls['naim'].value;
    this.newUch.obozn = this.fgUch.controls['obozn'].value;
    this.newUch.kod = this.fgUch.controls['kod'].value;
    this.newUch.podr = this.podrByUch;
  }

  onClickUpdateUch(){
    this.onSaveUch();
    // console.log(this.newUch);
    this.uchService.update(this.newUch).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT);
        this.toastService.showPositive('Успешно изменен участок');
      }
    }, error => {
      this.toastService.showNegative('Ошибка в редактировании участка');
      console.log('Ошибка в onClickUpdateUch() в UchEditDialogComponent')
    })
  }
    onClickCreateUch(){
    this.onSaveUch();
    // console.log(this.newUch);
    this.uchService.create(this.newUch).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT);
        this.toastService.showPositive('Успешно добавлен участок');
      }
    }, error => {
      this.toastService.showNegative('Ошибка в создании участка');
      console.log('Ошибка в onClickCreateUch() в UchEditDialogComponent')
    })
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
