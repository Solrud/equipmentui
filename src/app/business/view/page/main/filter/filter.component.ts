import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  DELAY_TIME,
  FIELD_COLUMN_GRUPPA_LIST,
  FIELD_COLUMN_KOMPL_LIST,
  FIELD_COLUMN_MODEL_LIST,
  FIELD_COLUMN_OBORUD_EKZ_LIST,
  TableType
} from "../../../../../app.constant";
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {FormControl, FormGroup} from "@angular/forms";
import {KomplSearchDTO} from "../../../../data/model/search/impl/KomplSearchDTO";
import {OborudEkzSearchDTO} from "../../../../data/model/search/impl/OborudEkzSearchDTO";
import {ModelSearchDTO} from "../../../../data/model/search/impl/ModelSearchDTO";
import {GruppaSearchDTO} from "../../../../data/model/search/impl/GruppaSearchDTO";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{
  komplFieldColumnList = FIELD_COLUMN_KOMPL_LIST.slice(1);
  gruppaFieldColumnList = FIELD_COLUMN_GRUPPA_LIST.slice(1);
  modelFieldColumnList = FIELD_COLUMN_MODEL_LIST.slice(1);
  oborudEkzFieldColumnList = FIELD_COLUMN_OBORUD_EKZ_LIST.slice(1);

  selectedSpravochnik: TableType;

  @Input()
  searchKompl: KomplSearchDTO;
  @Input()
  searchGruppa: GruppaSearchDTO;
  @Input()
  searchModel: ModelSearchDTO;
  @Input()
  searchOborudEkz: OborudEkzSearchDTO;

  @Output()
  newSearch: EventEmitter<any> = new EventEmitter<any>();

  fgKomplFilter: FormGroup;
  fgGruppaFilter: FormGroup;
  fgModelFilter: FormGroup;
  fgOborudEkzFilter: FormGroup;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    console.log(this.searchKompl)
    console.log(this.searchGruppa)
    console.log(this.searchModel)
    console.log(this.searchOborudEkz)
    this._subscribeToSelectedSpravochnik();



  }

  public get TableType(){
    return TableType;
  }

  _subscribeToSelectedSpravochnik(){
    this.eventService.selectedSpravTable$.subscribe( result => {
      this.selectedSpravochnik = result;

      this.initFgAll();

      this._observeFgKompl();
      this._observeFgGruppa();
      this._observeFgModel();
      this._observeFgOborudEkz();
    })
  }
  getCorrectValueFromField(field: string){
    if (this.selectedSpravochnik === TableType.KOMPL){
      if (this.searchKompl) return this.searchKompl[field];
    }
    if (this.selectedSpravochnik === TableType.GRUPPA){
      if (this.searchGruppa) return this.searchGruppa[field];
    }
    if (this.selectedSpravochnik === TableType.MODEL){
      if (this.searchModel) return this.searchModel[field];
    }
    if (this.selectedSpravochnik === TableType.OBORUD_EKZ){
      if (this.searchOborudEkz) return this.searchOborudEkz[field];
    }
    return null;
  }

  initFgAll(){
    this.fgKomplFilter = new FormGroup({
      kod: new FormControl({value: this.getCorrectValueFromField('kod'), disabled: false}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: false})
    })

    this.fgGruppaFilter = new FormGroup({
      kod: new FormControl({value: this.getCorrectValueFromField('kod'), disabled: false}),
      kodKlass: new FormControl({value: this.getCorrectValueFromField('kodKlass'), disabled: false}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: false})
    })
    this.fgModelFilter = new FormGroup({
      kod: new FormControl({value: this.getCorrectValueFromField('kod'), disabled: false}),
      obozn: new FormControl({value: this.getCorrectValueFromField('obozn'), disabled: false}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false}),
      akt: new FormControl({value: this.getCorrectValueFromField('akt'), disabled: false})
    })
    this.fgOborudEkzFilter = new FormGroup({
      serNom: new FormControl({value: this.getCorrectValueFromField('kod'), disabled: false}),
      invNom: new FormControl({value: this.getCorrectValueFromField('obozn'), disabled: false}),
      naim: new FormControl({value: this.getCorrectValueFromField('naim'), disabled: false})
    })
  }

  _observeFgKompl(){
    this.fgKomplFilter.controls['kod'].valueChanges.pipe(debounceTime(500)).subscribe( inputValue => {
      this.searchKompl.kod = inputValue;
      this.newSearch.emit(this.searchKompl);
    })
    this.fgKomplFilter.controls['naim'].valueChanges.pipe(debounceTime(500)).subscribe( inputValue => {
      this.searchKompl.naim = inputValue;
      this.newSearch.emit(this.searchKompl);
    })
  }
  _observeFgGruppa(){
    this.fgGruppaFilter.controls['kod'].valueChanges.pipe(debounceTime(500)).subscribe( inputValue => {
      this.searchGruppa.kod = inputValue;
      this.newSearch.emit(this.searchGruppa);
    })
    this.fgGruppaFilter.controls['kodKlass'].valueChanges.pipe(debounceTime(500)).subscribe( inputValue => {
      this.searchGruppa.kodKlass = inputValue;
      this.newSearch.emit(this.searchGruppa);
    })
    this.fgGruppaFilter.controls['naim'].valueChanges.pipe(debounceTime(500)).subscribe( inputValue => {
      this.searchGruppa.naim = inputValue;
      this.newSearch.emit(this.searchGruppa);
    })
  }
  _observeFgModel(){
    this.fgModelFilter.controls['kod'].valueChanges.pipe(debounceTime(500)).subscribe( inputValue => {
      this.searchModel.kod = inputValue;
      this.newSearch.emit(this.searchModel);
    })
    this.fgModelFilter.controls['obozn'].valueChanges.pipe(debounceTime(500)).subscribe( inputValue => {
      this.searchModel.obozn = inputValue;
      this.newSearch.emit(this.searchModel);
    })
    this.fgModelFilter.controls['naim'].valueChanges.pipe(debounceTime(500)).subscribe( inputValue => {
      console.log('валbю чейндж найм', inputValue)
      this.searchModel.naim = inputValue;
      this.newSearch.emit(this.searchModel);
    })
  }
  _observeFgOborudEkz(){
    this.fgOborudEkzFilter.controls['serNom'].valueChanges.pipe(debounceTime(500)).subscribe( inputValue => {
      this.searchOborudEkz.serNom = inputValue;
      this.newSearch.emit(this.searchOborudEkz);
    })
    this.fgOborudEkzFilter.controls['invNom'].valueChanges.pipe(debounceTime(500)).subscribe( inputValue => {
      this.searchOborudEkz.invNom = inputValue;
      this.newSearch.emit(this.searchOborudEkz);
    })

  }


  onClickChangeAct(){
    // переключение активности все такое
    if (this.selectedSpravochnik === TableType.KOMPL){
      if (this.searchKompl.akt != null){
        if (this.searchKompl.akt == 0){
          this.searchKompl.akt = null;
        }
        if (this.searchKompl.akt == 1)
          this.searchKompl.akt = 0;
      } else {
        this.searchKompl.akt = 1;
      }
      this.newSearch.emit(this.searchKompl);
    }
    if (this.selectedSpravochnik === TableType.GRUPPA){
      if (this.searchGruppa.akt != null){
        if (this.searchGruppa.akt == 0){
          this.searchGruppa.akt = null;
        }
        if (this.searchGruppa.akt == 1)
          this.searchGruppa.akt = 0;
      } else {
        this.searchGruppa.akt = 1;
      }
      this.newSearch.emit(this.searchGruppa);
    }
    if (this.selectedSpravochnik === TableType.MODEL){
      if (this.searchModel.akt != null){
        if (this.searchModel.akt == 0){
          this.searchModel.akt = null;
        }
        if (this.searchModel.akt == 1)
          this.searchModel.akt = 0;
      } else {
        this.searchModel.akt = 1;
      }
      this.newSearch.emit(this.searchModel);
    }
    if (this.selectedSpravochnik === TableType.OBORUD_EKZ){
      if (this.searchOborudEkz.akt != null){
        if (this.searchOborudEkz.akt == 0){
          this.searchOborudEkz.akt = null;
        }
        if (this.searchOborudEkz.akt == 1)
          this.searchOborudEkz.akt = 0;
      } else {
        this.searchOborudEkz.akt = 1;
      }
      this.newSearch.emit(this.searchOborudEkz);
    }
  }
}
