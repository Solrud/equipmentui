import {Component} from '@angular/core';
import {ProizvDTO} from "../../../../data/model/dto/impl/ProizvDTO";
import {DialogMode, DialogResult} from "../../../../../app.constant";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PodrDTO} from "../../../../data/model/dto/impl/PodrDTO";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {PodrService} from "../../../../data/service/implements/podr.service";
import {ToastService} from "../../../../data/service/OptionalService/toast.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-podr-edit-dialog',
  templateUrl: './podr-edit-dialog.component.html',
  styleUrls: ['./podr-edit-dialog.component.css']
})
export class PodrEditDialogComponent {
  selectedElement: PodrDTO;
  dialogMode: DialogMode;
  podrList: PodrDTO[];
  podrDDMList: PodrDTO[];

  newRodPodr: PodrDTO;
  fgPodr: FormGroup;
  newPodr: PodrDTO;

  isSameKodExist: boolean = false;

  readonly validatorMinLength: ValidatorFn = Validators.minLength(1000000000);

  constructor(private activeModal: NgbActiveModal,
              private podrService: PodrService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.initFgPodr();
    this.initDialogDefault();


    this._observeFcRod();
    this._observeFcKodKlass();
  }

  public get DialogMode(){
    return DialogMode;
  }
  public get Validators() {
    return Validators;
  }

  initDialogDefault(): void{
    if (!this.dialogMode) this.dialogMode = DialogMode.VIEW;
    if (!this.selectedElement) this.selectedElement = null;

    if (this.podrList){
      this.podrList = this.podrList.filter(podr => podr?.id != this.selectedElement?.id);
      this.podrDDMList = this.podrList;
    }

    if (this.dialogMode == DialogMode.EDIT && this.selectedElement.rod){
      this.onClickSelectDDIRod(this.selectedElement.rod);
    }
  }

  getCorrectValueFromField(field: string){
    if (this.selectedElement)
      return this.selectedElement[field];
    return null;
  }

  initFgPodr(): void{
    this.fgPodr = new FormGroup({
      id: new FormControl({value: this.getCorrectValueFromField('id'), disabled: true}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}, Validators.required),
      kod: new FormControl({value: this.getCorrectValueFromField('kod'), disabled: false},
        [Validators.required, Validators.pattern(/^\s*[\d]+([,\.][\d]+)?\s*$/)]),
      obozn: new FormControl({value: this.getCorrectValueFromField('obozn'), disabled: false}, Validators.required),
      rod: new FormControl({value: this.getCorrectValueFromField('rod'), disabled: false}),
      kodIsp: new FormControl({value: this.getCorrectValueFromField('kodIsp'), disabled: false})
    })
  }

  //получить идентификаторы обязательности заполнения поля
  fcFieldIsRequired(fcName: string, returnBoolean: boolean = false): any {
    let fcRequired = this.fgPodr.controls[fcName].hasValidator(Validators.required)
    return returnBoolean ? fcRequired : (fcRequired ? ' *' : '');
  }

  //добавляет или удаляет валидаторы у указанного контрола
  changeValidators(controlName: string, validators: ValidatorFn[], deleteValidators: boolean = false): void {
    deleteValidators ?
      this.fgPodr.get(controlName).removeValidators(validators) :
      this.fgPodr.get(controlName).addValidators(validators);
    this.fgPodr.controls[controlName].updateValueAndValidity({onlySelf: false, emitEvent: false});
  }

  _observeFcRod(){
    this.fgPodr.controls['rod'].valueChanges.pipe(
      tap(val => {
        this.newRodPodr = null;
        this.changeValidators('rod', [this.validatorMinLength], false);
      })
    ).subscribe( inputValue => {
      if (inputValue && inputValue.length > 0){
        this.podrDDMList = this.podrList.filter( podr => podr.obozn.toLowerCase().includes(inputValue.toLowerCase()));
      } else {
        this.podrDDMList = this.podrList;
      }
    })
  }

  _observeFcKodKlass(){
    this.fgPodr.controls['kod'].valueChanges.pipe(
      tap( val => {
        this.isSameKodExist = false;
        this.changeValidators('kod', [this.validatorMinLength],true);
      })
    ).subscribe( inputValue => {
      // проверяет есть ли такой же существующий код
      if (this.podrList.some( podr => {return podr.kod.trim() == inputValue}) && this.selectedElement?.kod != inputValue){

        this.isSameKodExist = true;
        this.changeValidators('kod', [this.validatorMinLength],false);
      }
    })
  }

  onClickSelectDDIRod(podr: PodrDTO){
    this.fgPodr.controls['rod'].setValue(podr.obozn);
    this.changeValidators('rod', [this.validatorMinLength], true);
    this.newRodPodr = podr;
  }

  onSaveNewPodr(){
    this.newPodr = new PodrDTO();
    this.newPodr.id = this.fgPodr.controls['id'].value;
    this.newPodr.naim = this.fgPodr.controls['naim'].value;
    this.newPodr.kod = this.fgPodr.controls['kod'].value;
    this.newPodr.obozn = this.fgPodr.controls['obozn'].value;
    this.newPodr.kodIsp = this.fgPodr.controls['kodIsp'].value;
    this.newPodr.rod = this.newRodPodr;
  }

  onClickUpdatePodr(){
    this.onSaveNewPodr();
    console.log(this.newPodr);
    this.podrService.update(this.newPodr).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT);
        this.toastService.showPositive('Успешно изменено подразделение');
      }
    }, error => {
      this.toastService.showNegative('Ошибка в создании подразделения');
      console.log('Ошибка в onClickUpdatePodr() в PodrEditDialogComponent')
    })
  }

  onClickCreatePodr(){
    this.onSaveNewPodr();
    console.log(this.newPodr);
    this.podrService.create(this.newPodr).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT);
        this.toastService.showPositive('Успешно создано подразделение');
      }
    }, error => {
      this.toastService.showNegative('Ошибка в создании подразделения');
      console.log('Ошибка в onClickCreatePodr() в PodrEditDialogComponent')
    })
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
