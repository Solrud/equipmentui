import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {initNavBar, TableData, TableType} from "../../../../app.constant";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  static selectedSpravTable$: BehaviorSubject<TableType> = new BehaviorSubject<TableType>(initNavBar);

  static tableDataSource$ = new BehaviorSubject(new TableData());


  spinnerVisibility = new BehaviorSubject(false);
  showSpinner(): void {
    console.log('спиннер есть');
    this.spinnerVisibility.next(true);
  }
  hideSpinner(): void {
    console.log('спиннера нету');
    this.spinnerVisibility.next(false);
  }
}
