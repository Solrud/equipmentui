import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DELAY_TIME, DialogMode, DialogResult, TypePartOfKodKlass} from "../../../../../app.constant";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {GruppaDTO} from "../../../../data/model/dto/impl/GruppaDTO";
import {OborudKlassDTO} from "../../../../data/model/dto/impl/OborudKlassDTO";
import {OborudVidDTO} from "../../../../data/model/dto/impl/OborudVid";
import {NalPuDTO} from "../../../../data/model/dto/impl/NalPuDTO";
import {GabZoDTO} from "../../../../data/model/dto/impl/GabZoDTO";
import {OborudKlassService} from "../../../../data/service/implements/oborud-klass.service";
import {OborudVidService} from "../../../../data/service/implements/oborud-vid.service";
import {NalPuService} from "../../../../data/service/implements/nal-pu.service";
import {GabZoService} from "../../../../data/service/implements/gab-zo.service";
import {debounceTime, tap} from "rxjs/operators";
import {ToastService} from "../../../../data/service/OptionalService/toast.service";

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

  newKlass: OborudKlassDTO;
  klassListDDM: OborudKlassDTO[];
  klassList: OborudKlassDTO[];

  newVid: OborudVidDTO;
  vidListDDM: OborudVidDTO[];
  vidList: OborudVidDTO[];

  newNalPu: NalPuDTO;
  nalPuListDDM: NalPuDTO[];
  nalPuList: NalPuDTO[];

  newGabZo: GabZoDTO;
  gabZoListDDM: GabZoDTO[];
  gabZoList: GabZoDTO[];

  fcKodKlass: string[] = [];

  isFirstTimeInit: boolean = true;

  readonly validatorMinLength: ValidatorFn = Validators.minLength(1000000000);

  constructor(private activeModal: NgbActiveModal,
              private gruppaService: GruppaService,
              private klassService: OborudKlassService,
              private vidService: OborudVidService,
              private nalPuService: NalPuService,
              private gabZoService: GabZoService,

              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.beforeInitDialogDefaultValues();
    this.initFgGruppaElement();
    this.afterInitDialogDefaultValues();

    this._observeFcKlass();
    this._observeFcVid();
    this._observeFcNalPu();
    this._observeFcGabZo();
  }

  public get DialogMode(){
    return DialogMode;
  }
  public get TypePartKodKlass(){
    return TypePartOfKodKlass;
  }
  public get Validators() {
    return Validators;
  }

  getCorrectValueFromField(field: string){
    if (this.dialogMode === DialogMode.CREATE){
      if (field == 'akt') return 1;
      if (field == 'tip') return "2";
      if (field == 'modely') return [];
      if (field == 'kodKlass') return this.fcKodKlass.join('-');
    }

    if (this.dialogMode == DialogMode.EDIT){
      if (field == 'klass') return this.selectedElement?.klass?.naim;
      if (field == 'vid') return this.selectedElement?.vid?.naim;
      if (field == 'nalPu') return this.selectedElement?.klass?.nalPu;
      if (field == 'gabZo') return this.selectedElement?.klass?.gabZo;
    }

    if (this.selectedElement) return this.selectedElement[field];
    return null;
  }

  afterInitDialogDefaultValues(){
    if (!this.dialogMode) this.dialogMode = DialogMode.VIEW;
    if (!this.selectedElement) this.selectedElement = null;

    this.klassService.searchAll().subscribe( result => {
      if (result && result.length > 0){
        this.klassList = result;
        this.klassListDDM = result;
      }
    }, error => {
      this.toastService.showNegativeFixed('Не удалось загрузить данные класса');
    })
    this.nalPuService.searchAll().subscribe( result => {
      if (result && result.length > 0){
        this.nalPuList = result;
        this.nalPuListDDM = result;

        if (this.dialogMode == DialogMode.EDIT && this.selectedElement.kodKlass){
          let nalPuObject: NalPuDTO = this.nalPuList.find( nalPu => nalPu.kodKlass.trim() === this.selectedElement.kodKlass.substring(4,5));
          this.onClickSelectDDINalPu(nalPuObject);
        }
      }
    }, error => {
      this.toastService.showNegativeFixed('Не удалось загрузить данные ПУ');
    })
    this.gabZoService.searchAll().subscribe( result => {
      if (result && result.length > 0){
        this.gabZoList = result;
        this.gabZoListDDM = result;

        if (this.dialogMode == DialogMode.EDIT && this.selectedElement.kodKlass){
          let gabZoObject: GabZoDTO = this.gabZoList.find( gabZo => gabZo.kodKlass === this.selectedElement.kodKlass.substring(5, 7))
          this.onClickSelectDDIGabZo(gabZoObject);
        }
      }
    }, error => {
      this.toastService.showNegativeFixed('Не удалось загрузить данные Габаритов');
    })

    if (this.dialogMode == DialogMode.EDIT && this.selectedElement.kodKlass){
      if (this.selectedElement.klass) this.onClickSelectDDIKlass(this.selectedElement.klass);
    }
  }

  beforeInitDialogDefaultValues(){
      this.fcKodKlass = ['XX', 'XX', 'X', 'XX'];
  }

  initFgGruppaElement(){
    this.fgGruppaElement = new FormGroup({
      id: new FormControl({value: this.getCorrectValueFromField('id'), disabled: true}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: true}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}, Validators.required),
      kod: new FormControl({value: this.getCorrectValueFromField('kod'), disabled: true}),
      tip: new FormControl({value: this.getCorrectValueFromField('tip'), disabled: true}),

      kodKlass: new FormControl({value: this.getCorrectValueFromField('kodKlass'), disabled: true}, Validators.required),
      klass: new FormControl({value: this.getCorrectValueFromField('klass'), disabled: false}, Validators.required),
      vid: new FormControl({value: this.getCorrectValueFromField('vid'), disabled: true}, Validators.required),
      nalPu: new FormControl({value: this.getCorrectValueFromField('nalPu'), disabled: false}, Validators.required),
      gabZo: new FormControl({value: this.getCorrectValueFromField('gabZo'), disabled: false}, Validators.required),
      rod: new FormControl({value: this.getCorrectValueFromField('rod'), disabled: true}),
      modely: new FormControl({value: this.getCorrectValueFromField('modely'), disabled: true}),
    })
  }

  changeFcKodKlass(typePartKod: TypePartOfKodKlass, kod: string){
    switch (typePartKod) {
      case TypePartOfKodKlass.KLASS_OBORUD:
        this.fcKodKlass[0] = kod;
        break;
      case TypePartOfKodKlass.VID_OBORUD:
        this.fcKodKlass[1] = kod;
        break;
      case TypePartOfKodKlass.NAL_PU:
        this.fcKodKlass[2] = kod.trim();
        break;
      case TypePartOfKodKlass.GAB_ZO:
        this.fcKodKlass[3] = kod;
        break;
    }
    this.fgGruppaElement.controls['kodKlass'].setValue(this.fcKodKlass.join('-'));
  }

  //добавляет или удаляет валидаторы у указанного контрола
  changeValidators(controlName: string, validators: ValidatorFn[], deleteValidators: boolean = false): void {
    deleteValidators ?
      this.fgGruppaElement.get(controlName).removeValidators(validators) :
      this.fgGruppaElement.get(controlName).addValidators(validators);
    this.fgGruppaElement.controls[controlName].updateValueAndValidity({onlySelf: false, emitEvent: false});
  }

  //получить идентификаторы обязательности заполнения поля
  fcFieldIsRequired(fcName: string, returnBoolean: boolean = false): any {
    let fcRequired = this.fgGruppaElement.controls[fcName].hasValidator(Validators.required)
    return returnBoolean ? fcRequired : (fcRequired ? ' *' : '');
  }

  //делает активным или неактивным поле у контрола
  changeFcEnableOrDisable(fcName: string, toEnable: boolean){
    toEnable ?
      this.fgGruppaElement.controls[fcName].enable() :
      this.fgGruppaElement.controls[fcName].disable()
  }

  _observeFcKlass(){
    this.fgGruppaElement.controls['klass'].valueChanges.pipe(
      tap( (val) => {
        // this.fgGruppaElement.controls['vid'].setValue()
        this.changeValidators('klass', [this.validatorMinLength], false);
        this.changeFcEnableOrDisable('vid', false);
        this.onClickSetNullKlass(false);
      }),
      debounceTime(DELAY_TIME)
    ).subscribe( inputValue => {
      if (inputValue && inputValue.length > 0){
        this.klassListDDM = this.klassList.filter( podr => podr.naim.toLowerCase().includes(inputValue.toLowerCase()));
      } else {
        this.klassListDDM = this.klassList;
      }
    })
  }

  _observeFcVid(){
    this.fgGruppaElement.controls['vid'].valueChanges.pipe(
      tap( (val) => {
        this.changeValidators('vid', [this.validatorMinLength], false)
        this.onClickSetNullVid(false);
      }),
      debounceTime(DELAY_TIME)
    ).subscribe( inputValue => {
      if (inputValue && inputValue.length > 0){
        this.vidListDDM = this.vidList.filter( vid => vid.naim.toLowerCase().includes(inputValue.toLowerCase()));
      } else {
        this.vidListDDM = this.vidList;
      }
    })
  }

  _observeFcNalPu(){
    this.fgGruppaElement.controls['nalPu'].valueChanges.pipe(
      tap( (val) => {
        this.changeValidators('nalPu', [this.validatorMinLength], false)
        this.onClickSetNullNalPu(false);
      }),
      debounceTime(DELAY_TIME)
    ).subscribe( inputValue => {
      if (inputValue && inputValue.length > 0){
        this.nalPuListDDM = this.nalPuList.filter( nalPu => nalPu.naim.toLowerCase().includes(inputValue.toLowerCase()));
      } else {
        this.nalPuListDDM = this.nalPuList;
      }
    })
  }

  _observeFcGabZo(){
    this.fgGruppaElement.controls['gabZo'].valueChanges.pipe(
      tap( (val) => {
        this.changeValidators('gabZo', [this.validatorMinLength], false)
        this.onClickGabZo(false);
      }),
      debounceTime(DELAY_TIME)
    ).subscribe( inputValue => {
      if (inputValue && inputValue.length > 0){
        this.gabZoListDDM = this.gabZoList.filter( gabZo => gabZo.naim.toLowerCase().includes(inputValue.toLowerCase()));
      } else {
        this.gabZoListDDM = this.gabZoList;
      }
    })
  }

  searchVidByKlassId(klassId: number){
    this.vidService.findByKlassId(klassId).subscribe( result => {
      this.vidList = result;
      this.vidListDDM = result;

      if (result && result.length > 0){
        this.changeFcEnableOrDisable('vid', true);
        this.fgGruppaElement.controls['vid'].setValue(null);
      }
      if(this.isFirstTimeInit && this.dialogMode != DialogMode.CREATE) {
        this.isFirstTimeInit = false;
        let vidOborudObject: OborudVidDTO = this.vidList.find(
          vidOborud => vidOborud.kodKlass == this.selectedElement.kodKlass.substring(2, 4));
        if (vidOborudObject) {
          this.onClickSelectDDIVid(vidOborudObject);
        }
      }
    }, error => {
      this.toastService.showNegativeFixed('Не удалось загрузить данные Вида');
    })
  }

  // Код(Класс) оборудования
  onClickSelectDDIKlass(klass: OborudKlassDTO){
    this.fgGruppaElement.controls['klass'].setValue(klass.kodKlass + ' | ' + klass.naim);
    this.newKlass = klass;
    this.changeValidators('klass', [this.validatorMinLength], true);

    this.searchVidByKlassId(klass.id);
    this.changeFcKodKlass(TypePartOfKodKlass.KLASS_OBORUD, klass.kodKlass);
  }

  // Вид оборудования
  onClickSelectDDIVid(vid: OborudVidDTO){
    this.fgGruppaElement.controls['vid'].setValue(vid.kodKlass + ' | ' + vid.naim);
    this.newVid = vid;
    this.changeValidators('vid', [this.validatorMinLength], true);

    this.changeFcKodKlass(TypePartOfKodKlass.VID_OBORUD, vid.kodKlass);
  }

  // Наличие Программного Управления
  onClickSelectDDINalPu(nalPu: NalPuDTO){
    this.fgGruppaElement.controls['nalPu'].setValue(nalPu.kodKlass + ' | ' + nalPu.naim);
    this.newNalPu = nalPu;
    this.changeValidators('nalPu', [this.validatorMinLength], true);

    this.changeFcKodKlass(TypePartOfKodKlass.NAL_PU, nalPu.kodKlass);
  }

  // Габариты Зоны Обработки
  onClickSelectDDIGabZo(gabZo: GabZoDTO){
    this.fgGruppaElement.controls['gabZo'].setValue(gabZo.kodKlass + ' | ' + gabZo.naim);
    this.newGabZo = gabZo;
    this.changeValidators('gabZo', [this.validatorMinLength], true);

    this.changeFcKodKlass(TypePartOfKodKlass.GAB_ZO, gabZo.kodKlass);
  }


  onClickSetNullAllKodKlassFields(){
    this.onClickSetNullKlass();
    this.onClickSetNullVid();
    this.onClickSetNullNalPu();
    this.onClickGabZo();
  }

  onClickSetNullKlass(forHTML: boolean = true){
    if (forHTML)
      this.fgGruppaElement.controls['klass'].setValue(null);

    this.fgGruppaElement.controls['vid'].setValue(null);
    this.changeFcKodKlass(TypePartOfKodKlass.KLASS_OBORUD, 'XX')
    this.changeFcKodKlass(TypePartOfKodKlass.VID_OBORUD, 'XX')
    this.newKlass = null;
    this.newVid = null;
  }

  onClickSetNullVid(forHTML: boolean = true){
    if (forHTML)
      this.fgGruppaElement.controls['vid'].setValue(null);

    this.newVid = null;
    this.changeFcKodKlass(TypePartOfKodKlass.VID_OBORUD, 'XX');
  }

  onClickSetNullNalPu(forHTML: boolean = true){
    if (forHTML)
      this.fgGruppaElement.controls['nalPu'].setValue(null);
    this.newNalPu = null;
    this.changeFcKodKlass(TypePartOfKodKlass.NAL_PU, 'X')
  }

  onClickGabZo(forHTML: boolean = true){
    if (forHTML)
      this.fgGruppaElement.controls['gabZo'].setValue(null);
    this.newGabZo = null;
    this.changeFcKodKlass(TypePartOfKodKlass.GAB_ZO, 'XX')
  }

  onSaveNewGruppa(){
    this.newGruppa = new GruppaDTO();
    this.newGruppa.id = this.fgGruppaElement.controls['id'].value;
    this.newGruppa.akt = this.fgGruppaElement.controls['akt'].value;
    this.newGruppa.naim = this.fgGruppaElement.controls['naim'].value;
    this.newGruppa.kod = this.fgGruppaElement.controls['kod'].value;
    this.newGruppa.tip = this.fgGruppaElement.controls['tip'].value;

    this.newGruppa.kodKlass = this.fcKodKlass.join('');
    this.newGruppa.klass = this.newKlass ? this.newKlass : null;
    this.newGruppa.vid = this.newVid ? this.newVid : null;
    this.newGruppa.nalPu = this.newNalPu ? this.newNalPu : null;
    this.newGruppa.gabZo = this.newGabZo ? this.newGabZo : null;

    this.newGruppa.rod = this.fgGruppaElement.controls['rod'].value;
    this.newGruppa.modely = this.fgGruppaElement.controls['modely'].value;
  }

  onClickUpdateGruppa(){
    this.onSaveNewGruppa();
    // console.log(this.newGruppa);
    this.gruppaService.update(this.newGruppa).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT)
      }
    }, error => {
      this.toastService.showNegative('Не удалось загрузить данные таблицы Группы');
      console.log('Ошибка GruppaElementEditDialogComponent onClickUpdateGruppa()')
    })
  }

  onClickCreateGruppa(){
    this.onSaveNewGruppa();
    // console.log(this.newGruppa);
    this.gruppaService.create(this.newGruppa).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT)
      }
    }, error => {
      this.toastService.showNegative('Не удалось "' + this.dialogMode +'" Группы');
      console.log('Ошибка GruppaElementEditDialogComponent onClickCreateGruppa()')
    })
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
