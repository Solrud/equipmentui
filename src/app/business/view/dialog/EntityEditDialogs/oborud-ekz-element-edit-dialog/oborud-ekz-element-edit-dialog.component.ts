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
import {ModelDTO} from "../../../../data/model/dto/impl/ModelDTO";
import {ModelService} from "../../../../data/service/implements/model.service";
import {OpenDialogService} from "../../../../data/service/OptionalService/open-dialog.service";
import {ToastService} from "../../../../data/service/OptionalService/toast.service";
import {ProizvSearchDTO} from "../../../../data/model/search/impl/ProizvSearchDTO";
import {PodrSearchDTO} from "../../../../data/model/search/impl/PodrSearchDTO";

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

  modelListDDM: ModelDTO[];
  modelList: ModelDTO[];
  newModel: ModelDTO = null;

  proizvListDDM: ProizvDTO[];
  proizvList: ProizvDTO[];
  newProizv: ProizvDTO;

  podrListDDM: PodrDTO[];
  podrList: PodrDTO[];
  newPodr: PodrDTO;
  uchListDDM: UchDTO[];
  uchList: UchDTO[];
  newUch: UchDTO;

  proizvSearch: ProizvSearchDTO;
  podrSearch: PodrSearchDTO;
  uchSearch: UchSearchDTO

  nomerIsFilled: boolean = false;

  isFirstTimeInit: boolean = true;

  constructor(private activeModal: NgbActiveModal,
              private oborudEkzService: OborudEkzService,
              private proizvService: ProizvService,
              private uchService: UchService,
              private podrService: PodrService,
              private modelService: ModelService,
              private openDialogService: OpenDialogService,
              private toastService: ToastService) {
  }
  // https://habr.com/ru/articles/346242/
  ngOnInit(): void {
    this.initFgOborudEkzElement();
    this.initDialogDefaultValues();
    this._observeSerAndInvNom();
    // this._observeFcProizv();
    // this._observeFcPodr();
    // this._observeFcUch();
    // this._observeFcModel();
  }

  public get DialogMode(){
    return DialogMode;
  }
  public get Validators() {
    return Validators;
  }

  initDialogDefaultValues(){
    if (!this.dialogMode) this.dialogMode = DialogMode.VIEW;
    if (this.dialogMode === DialogMode.VIEW) this.fgOborudEkzElement.disable();
    if (!this.selectedElement) this.selectedElement = null;
    if (!this.newModel && this.selectedElement?.model) this.newModel = this.selectedElement.model;

    if (!this.proizvSearch){
      this.proizvSearch = new ProizvSearchDTO();
      this.proizvSearch.pageSize = 0;
      this.proizvSearch.sortColumn = 'naim';
    }
    if (!this.podrSearch){
      this.podrSearch = new PodrSearchDTO();
      this.podrSearch.pageSize = 0;
      this.podrSearch.sortColumn = 'obozn';
      this.podrSearch.sortDirection = 'desc';
    }
    if (!this.uchSearch){
      this.uchSearch = new UchSearchDTO();
      this.uchSearch.pageSize = 0;
      this.uchSearch.sortColumn = 'obozn';
    }

    this.proizvService.searchPage(this.proizvSearch).subscribe( result => {
      if (result && result.content.length > 0)
        this.proizvListDDM = result.content;
        this.proizvList = result.content;
    })
    this.podrService.searchPage(this.podrSearch).subscribe( result => {
      if (result && result.content.length > 0)
        this.podrListDDM = result.content;
        this.podrList = result.content;
    })

    if (this.dialogMode != DialogMode.CREATE){
      if(this.selectedElement.proizv) this.onClickSelectDDIProizv(this.selectedElement.proizv);
      // if(this.selectedElement.model) this.onClickSelectDDIModel(this.selectedElement.model);
      if(this.selectedElement.podr) this.onClickSelectDDIPodr(this.selectedElement.podr);
    }
  }

  getCorrectValueFromField(field: string): any{
    if (this.dialogMode === DialogMode.CREATE){
      if (field == 'akt') return 1;
    }
    if (this.dialogMode != DialogMode.CREATE) {
      if (field == 'podr' && this.selectedElement?.podr) return this.selectedElement.podr.obozn;
      if (field == 'uch' && this.selectedElement?.uch) return this.selectedElement.uch.obozn;
      if (field == 'proizv' && this.selectedElement?.proizv) return this.selectedElement.proizv.naim;
      if (field == 'model' && this.selectedElement?.model) return this.selectedElement.model.naim;
    }
    if (this.selectedElement) return this.selectedElement[field];
    return null;
  }

  initFgOborudEkzElement(){
    this.fgOborudEkzElement = new FormGroup({
      id: new FormControl({value: this.getCorrectValueFromField('id'), disabled: true}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: true}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}, Validators.required),
      serNom: new FormControl({value: this.getCorrectValueFromField('serNom'), disabled: false},
        this.selectedElement?.serNom || this.selectedElement?.invNom ? null : Validators.required),
      invNom: new FormControl({value: this.getCorrectValueFromField('invNom'), disabled: false},
        this.selectedElement?.serNom || this.selectedElement?.invNom ? null : Validators.required),
      podr: new FormControl({value: this.getCorrectValueFromField('podr'), disabled: false}, Validators.required),
      uch: new FormControl({value: this.getCorrectValueFromField('uch'), disabled: true}, Validators.required),        //Участок обязателен если есть список участков в подразделени
      proizv: new FormControl({value: this.getCorrectValueFromField('proizv'), disabled: false}),
      model: new FormControl({value: this.getCorrectValueFromField('model'), disabled: false}, Validators.required),
      prim: new FormControl({value: this.getCorrectValueFromField('prim'), disabled: false}) // максимально 250 вводимых символов
    })
  }

  //поиск по айди подразделения участков привязанных к нему
  searchUchByPodrId(podrId: number){
    this.uchSearch.podrId = podrId;
    this.uchService.searchPage(this.uchSearch).subscribe( result => {
      this.uchList = result.content;
      this.uchListDDM = result.content;

      if (result && result.content.length > 0) {
        if (this.dialogMode != DialogMode.VIEW) this.changeFcEnableOrDisable('uch', true);
        this.fgOborudEkzElement.controls['uch'].setValue(null);
      }
      if(this.isFirstTimeInit) {
        if(this.dialogMode != DialogMode.CREATE && this.selectedElement.uch)
          this.onClickSelectDDIUch(this.selectedElement.uch)
      }
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

  //делает активным или неактивным поле у контрола
  changeFcEnableOrDisable(fcName: string, toEnable: boolean){
    toEnable ?
      this.fgOborudEkzElement.controls[fcName].enable() :
      this.fgOborudEkzElement.controls[fcName].disable()
  }

  _observeFcModel(){
    this.fgOborudEkzElement.controls['model'].valueChanges.pipe(debounceTime(0)
    ).subscribe( inputValue => {
        this.fgOborudEkzElement.controls['model'].setValue('');
        if (this.newModel){
          this.fgOborudEkzElement.controls['model'].setValue(this.newModel.naim);
        }
    })
  }

  _observeFcProizv(){
    this.fgOborudEkzElement.controls['proizv'].valueChanges.pipe(
      tap( (val) => {
        this.changeValidators('proizv', [this.validatorMinLength], false);
        this.newProizv = null;
      })
    , debounceTime(DELAY_TIME)
    ).subscribe( inputValue => {
        if (inputValue && inputValue.length > 0){
          this.proizvListDDM = this.proizvList.filter(docTyp => docTyp.naim.toLowerCase().includes(inputValue.toLowerCase()));
        } else {
          this.proizvListDDM = this.proizvList;
        }
    })
  }

  _observeFcPodr(){
    this.fgOborudEkzElement.controls['podr'].valueChanges.pipe(
      tap( (val) => {
        // this.fgOborudEkzElement.controls['uch'].setValue(null);
        this.changeValidators('podr', [this.validatorMinLength], false);
        this.changeFcEnableOrDisable('uch', false);
        this.newUch = null;
        this.newPodr = null;
        this.fgOborudEkzElement.controls['uch'].setValue(null);
      })
      , debounceTime(DELAY_TIME)
    ).subscribe( inputValue => {
      if (inputValue && inputValue.length > 0){
        let inputFormatted = inputValue;
        const indexOfI = inputFormatted.indexOf('|')
        if (indexOfI > 0 && inputValue.slice(indexOfI, indexOfI + 1) === '|')
          inputFormatted = inputFormatted.slice(0, indexOfI - 1);
        this.podrListDDM = this.podrList.filter(docTyp => docTyp.obozn.toLowerCase().includes(inputFormatted.toLowerCase()));
      } else {
        this.podrListDDM = this.podrList;
      }
    })
  }

  _observeFcUch(){
    this.fgOborudEkzElement.controls['uch'].valueChanges.pipe(
      tap( (val) => {
        this.changeValidators('uch', [this.validatorMinLength], false);
        this.newUch = null;
      })
      , debounceTime(DELAY_TIME)
    ).subscribe( inputValue => {
      if (inputValue && inputValue.length > 0){
        this.uchListDDM = this.uchList.filter(docTyp => docTyp.obozn.toLowerCase().includes(inputValue.toLowerCase()));
      } else {
        this.uchListDDM = this.uchList;
      }
    })
  }

  _observeSerAndInvNom(){
    this.fgOborudEkzElement.controls['serNom'].valueChanges.pipe(
      debounceTime(DELAY_TIME)
    ).subscribe( inputValue => {
      if (inputValue && inputValue.length > 0){
        this.changeValidators('invNom', [this.Validators.required], true);
      } else {
        this.changeValidators('invNom', [this.Validators.required], false);
      }
    })

    this.fgOborudEkzElement.controls['invNom'].valueChanges.pipe(
      debounceTime(DELAY_TIME)
    ).subscribe( inputValue => {
      if (inputValue && inputValue.length > 0){
        this.changeValidators('serNom', [this.Validators.required], true);
      } else {
        this.changeValidators('serNom', [this.Validators.required], false);
      }
    })
  }

  //выбор из списка DDM Производителя
  onClickSelectDDIProizv(proizv: ProizvDTO){
    this.fgOborudEkzElement.controls['proizv'].setValue(proizv.naim);
    this.newProizv = proizv;
    this.changeValidators('proizv', [this.validatorMinLength], true);
  }

  //выбор из списка DDM Подразделения/Цеха
  onClickSelectDDIPodr(podr: PodrDTO){
    this.fgOborudEkzElement.controls['podr'].setValue(podr.obozn + ' | ' + podr.naim);
    this.newPodr = podr;
    this.changeValidators('podr', [this.validatorMinLength], true);

    this.searchUchByPodrId(podr.id);
    // this.isFirstTimeInit ? this.isFirstTimeInit = false :  this.searchUchByPodrId(podr.id);
  }

  //выбор из списка DDM Участка
  onClickSelectDDIUch(uch: UchDTO){
    this.fgOborudEkzElement.controls['uch'].setValue(uch.obozn);
    this.newUch = uch;
    this.changeValidators('uch', [this.validatorMinLength], true);
    if (this.isFirstTimeInit) {
      this.isFirstTimeInit = false;
    }
  }

  onClickSetNullPodr(){
    this.fgOborudEkzElement.controls['podr'].setValue(null);
    this.fgOborudEkzElement.controls['uch'].setValue(null);
    this.newUch = null;
    this.newPodr = null;
  }

  onClickAttachModel(){
    this.openDialogService.openAttachedElementFromTableDialog(this.newModel, DialogMode.CREATE).closed.subscribe( result => {
      if(result[0] == DialogResult.ACCEPT){
        this.toastService.showPositive('Установлена связь с моделью');
        this.newModel = result[1];
        this.fgOborudEkzElement.controls['model'].setValue(result[1].naim);
      }
    })
  }

  onSaveNewOborudEkz(){
    this.newOborudEkz = new OborudEkzDTO();
    this.newOborudEkz.id = this.fgOborudEkzElement.controls['id'].value;
    this.newOborudEkz.akt = this.fgOborudEkzElement.controls['akt'].value;
    this.newOborudEkz.naim = this.fgOborudEkzElement.controls['naim'].value;
    this.newOborudEkz.serNom = this.fgOborudEkzElement.controls['serNom'].value;
    this.newOborudEkz.invNom = this.fgOborudEkzElement.controls['invNom'].value;
    this.newOborudEkz.prim = this.fgOborudEkzElement.controls['prim'].value;

    this.newOborudEkz.proizv = this.newProizv ? this.newProizv : null;
    this.newOborudEkz.model = this.newModel ? this.newModel : null;
    this.newOborudEkz.podr = this.newPodr ? this.newPodr : null;
    this.newOborudEkz.uch = this.newUch ? this.newUch : null;
  }

  onClickCreateOborudEkz(){
    this.onSaveNewOborudEkz();
    // console.log(this.newOborudEkz);
    this.oborudEkzService.create(this.newOborudEkz).subscribe( result => {
      if(result){
        this.activeModal.close(DialogResult.ACCEPT);
        this.toastService.showPositive('Успешно создан экземпляр оборудования');
      }
    }, error => {
      console.log('Ошибка в OborudEkzElementEditDialogComponent onClickCreateOborudEkz()');
      this.toastService.showPositive('Ошибка в создани экземпляра оборудования');
    })
  }

  onClickUpdateOborudEkz(){
    this.onSaveNewOborudEkz();
    // console.log(this.newOborudEkz);
    this.oborudEkzService.update(this.newOborudEkz).subscribe( result => {
      if(result){
        this.activeModal.close(DialogResult.ACCEPT);
        this.toastService.showPositive('Успешно изменен экземпляр оборудования');
      }
    }, error => {
      this.toastService.showPositive('Ошибка при изменении экземпляра оборудования');
      console.log('Ошибка в OborudEkzElementEditDialogComponent onClickUpdateOborudEkz()')
    })
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
