import {Component, OnInit} from '@angular/core';
import {DialogMode, DialogResult, TableType} from "../../../../../app.constant";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ModelService} from "../../../../data/service/implements/model.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModelDTO} from "../../../../data/model/dto/impl/ModelDTO";
import {GruppaDTO} from "../../../../data/model/dto/impl/GruppaDTO";
import {ToastService} from "../../../../data/service/OptionalService/toast.service";

@Component({
  selector: 'app-model-element-edit-dialog',
  templateUrl: './model-element-edit-dialog.component.html',
  styleUrls: ['./model-element-edit-dialog.component.css']
})
export class ModelElementEditDialogComponent implements OnInit{
  dialogMode: DialogMode;
  selectedElement: any;

  fgModelElement: FormGroup;

  newModel: ModelDTO;

  constructor(private activeModal: NgbActiveModal,
              private modelService: ModelService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.initDialogDefaultValues();
    this.initFgModelElement();
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
  }

  getCorrectValueFromField(field: string): any{
    if (this.dialogMode === DialogMode.CREATE){
      if (field == 'akt') return 1;
      if (field == 'tip') return "1";
      if (field == 'ekzemplary') return [];
    }
    if (this.selectedElement) return this.selectedElement[field];
    return null;
  }

  initFgModelElement(){
    this.fgModelElement = new FormGroup({
      id: new FormControl({value: this.getCorrectValueFromField('id'), disabled: true}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: true}),
      tip: new FormControl({value: this.getCorrectValueFromField('tip'), disabled: true}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}, Validators.required),
      kod: new FormControl({value: this.getCorrectValueFromField('kod'), disabled: true}),
      obozn: new FormControl({value: this.getCorrectValueFromField('obozn'), disabled: false}),
      ekzemplary: new FormControl({value: this.getCorrectValueFromField('ekzemplary'), disabled: true}),

      //ToDo полное наименование в модели? сдлеать чтоб уходило в серч ? НАДО СДЕЛАТЬ ЧТО-ЛИ 0__0
      polnNaim: new FormControl({value: this.getCorrectValueFromField('polnNaim'), disabled: true}),
    })

  }

  //получить идентификаторы обязательности заполнения поля
  fcFieldIsRequired(fcName: string, returnBoolean: boolean = false): any {
    let fcRequired = this.fgModelElement.controls[fcName].hasValidator(Validators.required)
    return returnBoolean ? fcRequired : (fcRequired ? ' *' : '');
  }

  onSaveNewModel(){
    this.newModel = new ModelDTO();
    this.newModel.id = this.fgModelElement.controls['id'].value;
    this.newModel.akt = this.fgModelElement.controls['akt'].value;
    this.newModel.tip = this.fgModelElement.controls['tip'].value;
    this.newModel.naim = this.fgModelElement.controls['naim'].value;
    this.newModel.kod = this.fgModelElement.controls['kod'].value;
    this.newModel.obozn = this.fgModelElement.controls['obozn'].value;
    this.newModel.ekzemplary = this.fgModelElement.controls['ekzemplary'].value;
  }

  onClickCreateModel(){
    this.onSaveNewModel();
    this.modelService.create(this.newModel).subscribe( result => {
      if(result){
        this.activeModal.close(DialogResult.ACCEPT);
        this.toastService.showPositive('Успешно создана модель');
      }
    }, error => {
      console.log('Ошибка в диалоге ModelElementEditDialogComponent, onClickCreateModel()');
      this.toastService.showNegative('Ошибка при создании модели');
    })
  }

  onClickUpdateModel(){
    this.onSaveNewModel();
    this.modelService.update(this.newModel).subscribe( result => {
      if(result){
        this.activeModal.close(DialogResult.ACCEPT);
        this.toastService.showPositive('Успешно изменена модель');
      }
    }, error => {
      console.log('Ошибка в диалоге ModelElementEditDialogComponent, onClickUpdateModel()');
      this.toastService.showNegative('Ошибка при изменении модели');
    })
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
