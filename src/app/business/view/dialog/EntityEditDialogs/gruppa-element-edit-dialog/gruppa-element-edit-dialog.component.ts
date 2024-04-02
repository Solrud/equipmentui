import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DialogMode, DialogResult, TableType} from "../../../../../app.constant";
import {GruppaService} from "../../../../data/service/implements/gruppa.service";
import {GruppaDTO} from "../../../../data/model/dto/impl/GruppaDTO";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {OborudKlassDTO} from "../../../../data/model/dto/impl/OborudKlassDTO";
import {OborudVidDTO} from "../../../../data/model/dto/impl/OborudVid";
import {NalPuDTO} from "../../../../data/model/dto/impl/NalPuDTO";
import {GabZoDTO} from "../../../../data/model/dto/impl/GabZoDTO";
import {OborudKlassService} from "../../../../data/service/implements/oborud-klass.service";
import {OborudVidService} from "../../../../data/service/implements/oborud-vid.service";
import {NalPuService} from "../../../../data/service/implements/nal-pu.service";
import {GabZoService} from "../../../../data/service/implements/gab-zo.service";

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

  constructor(private activeModal: NgbActiveModal,
              private gruppaService: GruppaService,
              private klassService: OborudKlassService,
              private vidService: OborudVidService,
              private nalPuService: NalPuService,
              private gabZoService: GabZoService) {
  }

  ngOnInit(): void {
    console.log(this.selectedElement);
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

    if (this.dialogMode == DialogMode.EDIT){
      if (field == 'klass') return this.selectedElement?.klass?.naim;
      if (field == 'vid') return this.selectedElement?.vid?.naim;
      if (field == 'nalPu') return this.selectedElement?.klass?.nalPu;
      if (field == 'gabZo') return this.selectedElement?.klass?.gabZo;
    }

    if (this.selectedElement) return this.selectedElement[field];
    return null;
  }

  initDialogDefaultValues(){
    if (!this.dialogMode) this.dialogMode = DialogMode.VIEW;
    if (!this.selectedElement) this.selectedElement = null;

    this.klassService.searchAll().subscribe( result => {
      if (result && result.length > 0){
        this.klassList = result;
        this.klassListDDM = result;
      }
    })
    this.vidService.searchAll().subscribe( result => {
      if (result && result.length > 0){
        this.vidList = result;
        this.vidListDDM = result;
      }
    })
    this.nalPuService.searchAll().subscribe( result => {
      if (result && result.length > 0){
        this.nalPuList = result;
        this.nalPuListDDM = result;
      }
    })
    this.gabZoService.searchAll().subscribe( result => {
      if (result && result.length > 0){
        this.gabZoList = result;
        this.gabZoListDDM = result;
      }
    })
  }

  initFgGruppaElement(){
    this.fgGruppaElement = new FormGroup({
      id: new FormControl({value: this.getCorrectValueFromField('id'), disabled: true}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: true}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}, Validators.required),
      kod: new FormControl({value: this.getCorrectValueFromField('kod'), disabled: true}),
      tip: new FormControl({value: this.getCorrectValueFromField('tip'), disabled: true}),

      kodKlass: new FormControl({value: this.getCorrectValueFromField('kodKlass'), disabled: false}, Validators.required),
      klass: new FormControl({value: this.getCorrectValueFromField('klass'), disabled: false}),
      vid: new FormControl({value: this.getCorrectValueFromField('vid'), disabled: false}),
      nalPu: new FormControl({value: this.getCorrectValueFromField('nalPu'), disabled: false}),
      gabZo: new FormControl({value: this.getCorrectValueFromField('gabZo'), disabled: false}),
      rod: new FormControl({value: this.getCorrectValueFromField('rod'), disabled: true}),
      modely: new FormControl({value: this.getCorrectValueFromField('modely'), disabled: true}),
    })
  }

  onSaveNewGruppa(){
    this.newGruppa = new GruppaDTO();
    this.newGruppa.id = this.fgGruppaElement.controls['id'].value;
    this.newGruppa.akt = this.fgGruppaElement.controls['akt'].value;
    this.newGruppa.naim = this.fgGruppaElement.controls['naim'].value;
    this.newGruppa.kod = this.fgGruppaElement.controls['kod'].value;
    this.newGruppa.tip = this.fgGruppaElement.controls['tip'].value;

    this.newGruppa.kodKlass = this.fgGruppaElement.controls['kodKlass'].value;
    this.newGruppa.klass = this.fgGruppaElement.controls['klass'].value;
    this.newGruppa.vid = this.fgGruppaElement.controls['vid'].value;
    this.newGruppa.nalPu = this.fgGruppaElement.controls['nalPu'].value;
    this.newGruppa.gabZo = this.fgGruppaElement.controls['gabZo'].value;
    this.newGruppa.rod = this.fgGruppaElement.controls['rod'].value;
    this.newGruppa.modely = this.fgGruppaElement.controls['modely'].value;
  }

  //получить идентификаторы обязательности заполнения поля
  fcFieldIsRequired(fcName: string, returnBoolean: boolean = false): any {
    let fcRequired = this.fgGruppaElement.controls[fcName].hasValidator(Validators.required)
    return returnBoolean ? fcRequired : (fcRequired ? ' *' : '');
  }

  onClickUpdateGruppa(){
    this.onSaveNewGruppa();
    console.log(this.newGruppa);
    // this.gruppaService.update(this.newGruppa).subscribe( result => {
    //   if (result){
    //     this.activeModal.close(DialogResult.ACCEPT)
    //   }
    // }, error => {
    //   console.log('Ошибка GruppaElementEditDialogComponent onClickUpdateGruppa()')
    // })
  }

  onClickCreateGruppa(){
    this.onSaveNewGruppa();
    console.log(this.newGruppa);
    // this.gruppaService.create(this.newGruppa).subscribe( result => {
    //   if (result){
    //     this.activeModal.close(DialogResult.ACCEPT)
    //   }
    // }, error => {
    //   console.log('Ошибка GruppaElementEditDialogComponent onClickCreateGruppa()')
    // })
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
