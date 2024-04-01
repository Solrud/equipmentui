import {Component, OnInit} from '@angular/core';
import {DELAY_TIME, DialogMode, DialogResult} from "../../../../../app.constant";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {OborudEkzDTO} from "../../../../data/model/dto/impl/OborudEkzDTO";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {OborudEkzService} from "../../../../data/service/implements/oborud-ekz.service";
import {ProizvService} from "../../../../data/service/implements/proizv.service";
import {UchService} from 'src/app/business/data/service/implements/uch.service';
import {PodrService} from "../../../../data/service/implements/podr.service";
import {ProizvDTO} from "../../../../data/model/dto/impl/ProizvDTO";
import {PodrDTO} from "../../../../data/model/dto/impl/PodrDTO";
import {UchDTO} from "../../../../data/model/dto/impl/UchDTO";
import {debounceTime, tap} from "rxjs/operators";
import {UchSearchDTO} from "../../../../data/model/search/impl/UchSearchDTO";

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

  readonly validatorMinLength: ValidatorFn = Validators.minLength(1000000000);

  proizvListDDM: ProizvDTO[];
  proizvList: ProizvDTO[];
  newProizv: ProizvDTO;

  podrListDDM: PodrDTO[];
  podrList: PodrDTO[];
  newPodr: PodrDTO;
  uchListDDM: UchDTO[];
  uchList: UchDTO[];
  newUch: UchDTO;

  constructor(private activeModal: NgbActiveModal,
              private oborudEkzService: OborudEkzService,
              private proizvService: ProizvService,
              private uchService: UchService,
              private podrService: PodrService) {
  }
  // https://habr.com/ru/articles/346242/
  ngOnInit(): void {
    this.initDialogDefaultValues();
    this.initFgOborudEkzElement();

    this._observeFcProizv();
    this._observeFcPodr();
    this._observeFcUch();
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
        this.proizvList = result;
    })
    this.podrService.searchAll().subscribe( result => {
      if (result && result.length > 0)
        this.podrListDDM = result;
        this.podrList = result;
    })
  }

  getCorrectValueFromField(field: string): any{
    if (this.dialogMode === DialogMode.CREATE){
      if (field == 'akt') return 1;
    }
    if (this.dialogMode == DialogMode.EDIT)
      if (field == 'podr') return this.selectedElement.podr.naim;

      // ?

    if (this.selectedElement) return this.selectedElement[field];
    return null;
  }

  searchUchByPodrId(podrId: number){
    let uchSearch = new UchSearchDTO();
    uchSearch.podrId = podrId;
    this.uchService.searchPage(uchSearch).subscribe( result => {
      this.uchList = result.content;
      this.uchListDDM = result.content;

      if (result.content.length > 0) {
        console.log('result.content.length > 0     1')
        this.changeFcEnableOrDisable('uch', true);
        this.changeValidators('uch', [this.validatorMinLength], false);
      } else {
        console.log('result.content.length < 0     2')
        this.changeFcEnableOrDisable('uch', true);
        this.changeValidators('uch', [this.validatorMinLength], true);
      }
    })
  }

  initFgOborudEkzElement(){
    this.fgOborudEkzElement = new FormGroup({
      id: new FormControl({value: this.getCorrectValueFromField('id'), disabled: true}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: true}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}, Validators.required),
      //ToDo Обязательно одно из номеров, для создания нужно заполнить либо serNom || invNom
      serNom: new FormControl({value: this.getCorrectValueFromField('serNom'), disabled: false}, Validators.required),
      invNom: new FormControl({value: this.getCorrectValueFromField('invNom'), disabled: false}, Validators.required),
      podr: new FormControl({value: this.getCorrectValueFromField('podr'), disabled: false}, Validators.required),
      uch: new FormControl({value: this.getCorrectValueFromField('uch'), disabled: true}),        //Участок обязателен если есть список участков в подразделени
      proizv: new FormControl({value: this.getCorrectValueFromField('proizv'), disabled: false}),
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

  //добавляет или удаляет валидаторы у указанного контрола
  changeValidators(controlName: string, validators: ValidatorFn[], deleteValidators: boolean = false): void {
    deleteValidators ?
      this.fgOborudEkzElement.get(controlName).removeValidators(validators) :
      this.fgOborudEkzElement.get(controlName).addValidators(validators);
    this.fgOborudEkzElement.controls[controlName].updateValueAndValidity({onlySelf: false, emitEvent: false});
  }

  changeFcEnableOrDisable(fcName: string, toEnable: boolean){
    toEnable ?
      this.fgOborudEkzElement.controls[fcName].enable() :
      this.fgOborudEkzElement.controls[fcName].disable()
  }

  _observeFcProizv(){
    this.fgOborudEkzElement.controls['proizv'].valueChanges.pipe(
      tap( (val) => {
        this.changeValidators('proizv', [this.validatorMinLength], false);
      })
    , debounceTime(DELAY_TIME)
    ).subscribe( inputValue => {
        if (inputValue && inputValue.length > 0){
          this.proizvListDDM = this.proizvList.filter(docTyp => docTyp.naim.includes(inputValue));
        } else {
          this.proizvListDDM = this.proizvList;
        }
    })


    //ToDo если ддм пое не обязательно, сделать правильную логику проверки поля на неверное или пустое
    // если поле не пустое и неправильное, то добавлть валидатор, если выбрано из списка или пустое поле, то валидатор прошел или отсутствует

    // this.fgOborudEkzElement.controls['proizv'].valueChanges.pipe(
    //   debounceTime(DELAY_TIME)
    // ).subscribe( inputValue => {
    //   console.log(inputValue)
    //   console.log(typeof inputValue )
    //   if (inputValue && inputValue.length > 0){
    //     this.proizvListDDM = this.proizvList.filter(docTyp => docTyp.naim.includes(inputValue));
    //   } else {
    //     this.proizvListDDM = this.proizvList;
    //   }
    //   if (inputValue && inputValue.length > 0) {
    //     let isInputValueInProizvList = this.proizvList.some(obj => obj.naim.toLowerCase() == inputValue.toLowerCase());
    //     if (isInputValueInProizvList) {
    //       this.changeValidators('proizv', [this.validatorMinLength], true);
    //     } else {
    //       this.changeValidators('proizv', [this.validatorMinLength], false);
    //     }
    //   }
    //   if (inputValue == "" || !inputValue || inputValue.length == 0)
    //     this.changeValidators('proizv', [this.validatorMinLength], false);
    // })

  }

  _observeFcPodr(){
    this.fgOborudEkzElement.controls['podr'].valueChanges.pipe(
      tap( (val) => {
        console.log(val)
        this.changeValidators('podr', [this.validatorMinLength], false);
      })
      , debounceTime(DELAY_TIME)
    ).subscribe( inputValue => {
      if (inputValue && inputValue.length > 0){
        this.podrListDDM = this.podrList.filter(docTyp => docTyp.naim.includes(inputValue));
      } else {
        this.podrListDDM = this.podrList;
      }
    })
  }

  _observeFcUch(){
    this.fgOborudEkzElement.controls['uch'].valueChanges.pipe(
      tap()
    )
  }

  //выбор из списка DDM Производителя
  onClickSelectDDIProizv(proizv: ProizvDTO){
    this.fgOborudEkzElement.controls['proizv'].setValue(proizv.naim);
    this.newProizv = proizv;
    this.changeValidators('proizv', [this.validatorMinLength], true);
  }

  //выбор из списка DDM Подразделения/Цеха
  onClickSelectDDIPodr(podr: PodrDTO){
    this.fgOborudEkzElement.controls['podr'].setValue(podr.naim);
    this.newPodr = podr;
    this.changeValidators('podr', [this.validatorMinLength], true);

    this.searchUchByPodrId(podr.id);
    console.log(podr);
  }

  //выбор из списка DDM Участка
  onClickSelectDDIUch(uch: UchDTO){
    this.fgOborudEkzElement.controls['uch'].setValue(uch.naim);
    this.newUch = uch;
    this.changeValidators('podr', [this.validatorMinLength], true);

    console.log(uch);
  }


  onSaveNewOborudEkz(){
    this.newOborudEkz = new OborudEkzDTO();
    this.newOborudEkz.id = this.fgOborudEkzElement.controls['id'].value;
    this.newOborudEkz.akt = this.fgOborudEkzElement.controls['akt'].value;
    this.newOborudEkz.naim = this.fgOborudEkzElement.controls['naim'].value;
    this.newOborudEkz.serNom = this.fgOborudEkzElement.controls['serNom'].value;
    this.newOborudEkz.invNom = this.fgOborudEkzElement.controls['invNom'].value;
    this.newOborudEkz.model = this.fgOborudEkzElement.controls['model'].value;

    this.newOborudEkz.proizv = this.newProizv;
    this.newOborudEkz.podr = this.newPodr;
    this.newOborudEkz.uch = this.newUch;
  }

  onClickCreateOborudEkz(){
    this.onSaveNewOborudEkz();
    console.log(this.newOborudEkz);
    // this.oborudEkzService.create(this.newOborudEkz).subscribe( result => {
    //   if(result)
    //     this.activeModal.close(DialogResult.ACCEPT);
    // }, error => {
    //   console.log('Ошибка в OborudEkzElementEditDialogComponent onClickCreateOborudEkz()')
    // })
  }

  onClickUpdateOborudEkz(){
    this.onSaveNewOborudEkz();
    console.log(this.newOborudEkz);
    // this.oborudEkzService.update(this.newOborudEkz).subscribe( result => {
    //   if(result)
    //     this.activeModal.close(DialogResult.ACCEPT);
    // }, error => {
    //   console.log('Ошибка в OborudEkzElementEditDialogComponent onClickUpdateOborudEkz()')
    // })
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
