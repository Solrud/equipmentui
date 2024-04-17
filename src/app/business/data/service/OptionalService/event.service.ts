import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {INIT_NAV_BAR, TableType} from "../../../../app.constant";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  // --------------------------------------- Таблица ПРЕДпросмотра выбранных связей----------------------------
  selectedPreRelatedElement$ = new Subject();
  selectPreRelatedElement$(selectedElement: any){
    this.selectedPreRelatedElement$.next(selectedElement);
  }

  // --------------------------------------- Связей таблицы ---------------------------------------------------
  selectedElementKomplRelationshipTable$ = new Subject();                   // Выбранная строка из Комплекса, таблицы СВЯЗЕЙ
  selectElementKomplRelationshipTable$(selectedElement: any){
    this.selectedElementKomplRelationshipTable$.next(selectedElement);
  }

  selectedElementGruppaRelationshipTable$ = new Subject();                  // Выбранная строка из Группы, таблицы СВЯЗЕЙ
  selectElementGruppaRelationshipTable$(selectedElement: any){
    this.selectedElementGruppaRelationshipTable$.next(selectedElement);
  }

  selectedElementModelRelationshipTable$ = new Subject();                   // Выбранная строка из Модели, таблицы СВЯЗЕЙ
  selectElementModelRelationshipTable$(selectedElement: any){
    this.selectedElementModelRelationshipTable$.next(selectedElement);
  }

  selectedElementOborudEkzRelationshipTable$ = new Subject();               // Выбранная строка из Экземпляра оборудования, таблицы СВЯЗЕЙ
  selectElementOborudEkzRelationshipTable$(selectedElement: any){
    this.selectedElementOborudEkzRelationshipTable$.next(selectedElement);
  }
  // --------------------------------------- Главная таблица ---------------------------------------------------
  selectedElementMainTable$ = new Subject();                      // Выбранная строка(элемент) из ГЛАВНОЙ таблицы
  selectElementMainTable$(selectedElement: any){
    this.selectedElementMainTable$.next(selectedElement);
  }
  // --------------------------------------- Настройки таблицы  ------------------------------------------------
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
  // --------------------------------------- Справочник оборудования -------------------------------------------
  selectedSpravTable$ = new BehaviorSubject(INIT_NAV_BAR);        // Выбранный справочник оборудования
  selectSpravTab$(navTab: TableType){
    this.selectedSpravTable$.next(navTab);
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
