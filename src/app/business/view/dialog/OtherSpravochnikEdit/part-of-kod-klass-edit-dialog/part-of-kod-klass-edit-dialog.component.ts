import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DialogMode, DialogResult, TableType} from "../../../../../app.constant";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {OborudKlassDTO} from "../../../../data/model/dto/impl/OborudKlassDTO";
import {OborudKlassService} from "../../../../data/service/implements/oborud-klass.service";
import {OborudVidService} from "../../../../data/service/implements/oborud-vid.service";
import {NalPuService} from "../../../../data/service/implements/nal-pu.service";
import {GabZoService} from "../../../../data/service/implements/gab-zo.service";
import {OborudVidDTO} from "../../../../data/model/dto/impl/OborudVid";
import {GabZoDTO} from "../../../../data/model/dto/impl/GabZoDTO";
import {NalPuDTO} from "../../../../data/model/dto/impl/NalPuDTO";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-part-of-kod-klass-edit-dialog',
  templateUrl: './part-of-kod-klass-edit-dialog.component.html',
  styleUrls: ['./part-of-kod-klass-edit-dialog.component.css']
})
export class PartOfKodKlassEditDialogComponent implements OnInit{
  listFromElement: any[];
  isSameKodExist: boolean = false;

  selectedElement: any;
  selectedNavBar: TableType;
  dialogMode: DialogMode;
  klassForVid: OborudKlassDTO;

  currentService: OborudKlassService | OborudVidService | NalPuService | GabZoService;
  currentNewKodPart: OborudVidDTO | OborudKlassDTO | NalPuDTO | GabZoDTO;

  fgKod: FormGroup;
  readonly validatorMinLength: ValidatorFn = Validators.minLength(1000000000);

  constructor(private activeModal: NgbActiveModal,
              private klassService: OborudKlassService,
              private vidService: OborudVidService,
              private nalPuService: NalPuService,
              private gabZoService: GabZoService
  ) {}

  ngOnInit(): void {
    console.log(this.listFromElement)
    console.log(this.selectedElement)
    console.log(this.klassForVid)
    console.log(this.selectedNavBar)
    console.log(this.dialogMode)
    this.initDialogDefault();
    this.initFgKod();
    console.log('прошло initFg')

    this.initCurrentServiceAndKodObject();
    this._observeFcKodKlass();


  }

  public get Validators(){
    return Validators;
  }
  public get DialogMode(){
    return DialogMode;
  }

  initCurrentServiceAndKodObject(){
    switch (this.selectedNavBar) {
      case TableType.OBORUD_VID:
        this.currentService = this.vidService;
        this.currentNewKodPart = new OborudVidDTO();
        break;
      case TableType.OBORUD_KLASS:
        this.currentService = this.klassService;
        this.currentNewKodPart = new OborudKlassDTO();
        break;
      case TableType.NAL_PU:
        this.currentService = this.nalPuService;
        this.currentNewKodPart = new NalPuDTO();
        break;
      case TableType.GAB_ZO:
        this.currentService = this.gabZoService;
        this.currentNewKodPart = new GabZoDTO();
        break;
    }
  }

  _observeFcKodKlass(){
    this.fgKod.controls['kodKlass'].valueChanges.pipe(
      tap((val) => {
        this.isSameKodExist = false;
        this.changeValidators('kodKlass', [this.validatorMinLength], true);
      })).subscribe( inputValue => {
      // если нолики то онуляет поле
      // if(inputValue == '00' || (this.selectedNavBar === TableType.NAL_PU && inputValue == '0'))
      //   this.fgKod.controls['kodKlass'].setValue('');

      // проверяет нет ли таких существующих кодов по списку
      if (this.listFromElement.some( obj => { return obj.kodKlass.trim() == inputValue}) &&
        (this.dialogMode != DialogMode.CREATE && inputValue != this.selectedElement.kodKlass)){
        this.isSameKodExist = true;
        this.changeValidators('kodKlass', [this.validatorMinLength], false);
      }

      // обрезает вводимый код до 2 или 1 цифр
      if (inputValue.length > 2 && this.selectedNavBar != TableType.NAL_PU)
        this.fgKod.controls['kodKlass'].setValue(inputValue.substring(0, 2));
      if (inputValue.length > 1 && this.selectedNavBar === TableType.NAL_PU)
        this.fgKod.controls['kodKlass'].setValue(inputValue.substring(0, 1));
    }
    )
  }

  initDialogDefault(){
    if (!this.dialogMode) this.dialogMode = DialogMode.VIEW;
    if (!this.selectedElement) this.selectedElement = null;

  }

  getCorrectValueFromField(field: string){
    if (this.dialogMode == DialogMode.CREATE && field == 'klass' && this.selectedNavBar == TableType.OBORUD_VID){
      return this.klassForVid.naim;
    }
    if (this.dialogMode != DialogMode.CREATE && this.selectedElement){
      console.log()
      if (field == 'klass' && this.selectedNavBar == TableType.OBORUD_VID) {
        return this.selectedElement.klass.naim;
      }
      return this.selectedElement[field];
    }
    return null;
  }



  initFgKod(){
    this.fgKod = new FormGroup({
      id: new FormControl({value: this.getCorrectValueFromField('id'), disabled: true}),
      kodKlass: new FormControl({value: this.getCorrectValueFromField('kodKlass'), disabled: false},
        [Validators.required, Validators.pattern(/^\s*[\d]+([,\.][\d]+)?\s*$/),
          this.selectedNavBar != TableType.NAL_PU ? Validators.minLength(2) : Validators.minLength(1)]),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}, Validators.required),
      klass: new FormControl({value: this.getCorrectValueFromField('klass'), disabled: true}),
    })
    // console.log(this.fgKod.controls['id'].value);
    // console.log(this.fgKod.controls['kodKlass'].value);
    // console.log(this.fgKod.controls['naim'].value);
    // console.log(this.fgKod.controls['klass'].value);
  }

  //добавляет или удаляет валидаторы у указанного контрола
  changeValidators(controlName: string, validators: ValidatorFn[], deleteValidators: boolean = false): void {
    deleteValidators ?
      this.fgKod.get(controlName).removeValidators(validators) :
      this.fgKod.get(controlName).addValidators(validators);
    this.fgKod.controls[controlName].updateValueAndValidity({onlySelf: false, emitEvent: false});
  }

  //получить идентификаторы обязательности заполнения поля
  fcFieldIsRequired(fcName: string, returnBoolean: boolean = false): any {
    let fcRequired = this.fgKod.controls[fcName].hasValidator(Validators.required)
    return returnBoolean ? fcRequired : (fcRequired ? ' *' : '');
  }

  onSaveKodPart(){
    this.currentNewKodPart.id = this.fgKod.controls['id'].value;
    this.currentNewKodPart.naim = this.fgKod.controls['naim'].value;

    let kodKlassFc = this.fgKod.controls['kodKlass'].value;
    if (this.selectedNavBar != TableType.NAL_PU && kodKlassFc.length == 1){
      kodKlassFc = '0' + kodKlassFc;
    }
    this.currentNewKodPart.kodKlass = kodKlassFc

    if (this.currentNewKodPart instanceof OborudVidDTO) {
      if (this.dialogMode != DialogMode.CREATE)
        this.currentNewKodPart.klass = this.selectedElement.klass;
      if (this.dialogMode === DialogMode.CREATE)
        this.currentNewKodPart.klass = this.klassForVid;

    }
    console.log(this.currentNewKodPart);
  }

  onClickUpdateKodPart(){
    this.onSaveKodPart();
    //@ts-ignore
    this.currentService.update(this.currentNewKodPart).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT)
      }
    })
  }


  onClickCreateKodPart(){
    this.onSaveKodPart();
    //@ts-ignore
    this.currentService.create(this.currentNewKodPart).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT)
      }
    })
  }


  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
