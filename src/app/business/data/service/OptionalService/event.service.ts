import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {INIT_NAV_BAR, TableData, TableType} from "../../../../app.constant";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  selectedElementMainTable$ = new Subject();                      // Выбранная строка(элемент) из ГЛАВНОЙ таблицы
  selectElementMainTable$(selectedElement: any){
    this.selectedElementMainTable$.next(selectedElement);
  }

  selectedElementOborudKlassTable$ = new Subject();               // Выбранная строка из Кода оборудования
  selectElementOborudKlassTable$(selectedElement: any){
    this.selectedElementOborudKlassTable$.next(selectedElement);
  }

  selectedElementOborudVidTable$ = new Subject();                 // Выбранная строка из Вида оборудования
  selectElementOborudVidTable$(selectedElement: any){
    this.selectedElementOborudVidTable$.next(selectedElement);
  }

  selectedElementNalPuTable$ = new Subject();                     // Выбранная строка из Наличия ПУ
  selectElementNalPuTable$(selectedElement: any){
    this.selectedElementNalPuTable$.next(selectedElement);
  }

  selectedElementGabZoTable$ = new Subject();                     // Выбранная строка из Габаритов ЗО
  selectElementGabZoTable$(selectedElement: any){
    this.selectedElementGabZoTable$.next(selectedElement);
  }

  selectedElementProizvTable$ = new Subject();                    // Выбранная строка из Производитель
  selectElementProizvTable$(selectedElement: any){
    this.selectedElementProizvTable$.next(selectedElement);
  }

  selectedElementPodrTable$ = new Subject();                      // Выбранная строка из Подразделение
  selectElementPodrTable$(selectedElement: any){
    this.selectedElementPodrTable$.next(selectedElement);
  }

  selectedElementUchTable$ = new Subject();                       // Выбранная строка из Участка
  selectElementUchTable$(selectedElement: any){
    this.selectedElementUchTable$.next(selectedElement);
  }

  selectedSpravTable$ = new BehaviorSubject(INIT_NAV_BAR);
  selectSpravTab$(navTab: TableType){
    this.selectedSpravTable$.next(navTab);
  }

  tableDataSource$ = new BehaviorSubject(new TableData());
  pushTableDataSource$(columnList: string[], dataTableList: object[]){
    this.tableDataSource$.next(new TableData(columnList, dataTableList))
  }

  spinnerVisibility = new BehaviorSubject(false);
  showSpinner$(): void {
    // console.log('спиннер есть');
    this.spinnerVisibility.next(true);
  }
  hideSpinner$(): void {
    // console.log('спиннера нету');
    this.spinnerVisibility.next(false);
  }
}
