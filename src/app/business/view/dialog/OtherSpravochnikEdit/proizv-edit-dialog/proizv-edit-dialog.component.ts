import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DialogMode, DialogResult, TypePartOfKodKlass} from "../../../../../app.constant";
import {ProizvDTO} from "../../../../data/model/dto/impl/ProizvDTO";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProizvService} from "../../../../data/service/implements/proizv.service";
import {ToastService} from "../../../../data/service/OptionalService/toast.service";

@Component({
  selector: 'app-proizv-edit-dialog',
  templateUrl: './proizv-edit-dialog.component.html',
  styleUrls: ['./proizv-edit-dialog.component.css']
})
export class ProizvEditDialogComponent {
  selectedElement: ProizvDTO;
  dialogMode: DialogMode;

  fgProizv: FormGroup;
  newProizv: ProizvDTO;

  constructor(private activeModal: NgbActiveModal,
              private proizvService: ProizvService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.initDialogDefault();
    this.initFgProizv();

    console.log(this.selectedElement)
    console.log(this.dialogMode)
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
  initDialogDefault(){
    if (!this.dialogMode) this.dialogMode = DialogMode.VIEW;
    if (!this.selectedElement) this.selectedElement = null;
  }

  getCorrectValueFromField(field: string){
    if (this.selectedElement) return this.selectedElement[field];
    return null
  }

  initFgProizv(){
    this.fgProizv = new FormGroup({
      id: new FormControl({value: this.getCorrectValueFromField('id'), disabled: true}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}, Validators.required),
      polnNaim: new FormControl({value: this.getCorrectValueFromField('polnNaim'), disabled: false}, Validators.required),
    })
  }

  //получить идентификаторы обязательности заполнения поля
  fcFieldIsRequired(fcName: string, returnBoolean: boolean = false): any {
    let fcRequired = this.fgProizv.controls[fcName].hasValidator(Validators.required)
    return returnBoolean ? fcRequired : (fcRequired ? ' *' : '');
  }


  onSaveNewProizv(){
    this.newProizv = new ProizvDTO();
    this.newProizv.id = this.fgProizv.controls['id'].value;
    this.newProizv.naim = this.fgProizv.controls['naim'].value;
    this.newProizv.polnNaim = this.fgProizv.controls['polnNaim'].value;
  }


  onClickUpdateProizv(){
    this.onSaveNewProizv();
    // console.log(this.newProizv);
    this.proizvService.update(this.newProizv).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT)
        this.toastService.showPositive('Успешно изменен производитель');
      }
    }, error => {
      this.toastService.showNegative('Не удалось изменить производителя');
    })
  }

  onClickCreateProizv(){
    this.onSaveNewProizv();
    // console.log(this.newProizv);
    this.proizvService.create(this.newProizv).subscribe( result => {
      if (result){
        this.activeModal.close(DialogResult.ACCEPT);
        this.toastService.showPositive('Успешно создан производитель');
      }
    }, error => {
      this.toastService.showNegative('Не удалось создать производителя');
    })
  }

  onClickCloseModal(): void{
    this.activeModal.close(DialogResult.CANCEL);
  }
}
